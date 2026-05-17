<?php
// ─────────────────────────────────────────
// contact.php — Upload to Hostinger
// Path: public_html/api/contact.php
// URL:  https://yourdomain.com/api/contact.php
// ─────────────────────────────────────────

header('Access-Control-Allow-Origin: http://webxautomation.in'); // ← your domain
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit();
}
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'message' => 'Method not allowed']);
  exit();
}

// ─────────────────────────────────────────
// CHANGE THIS — reCAPTCHA v2 SECRET key
// https://www.google.com/recaptcha/admin
// Choose "reCAPTCHA v2" → "I'm not a robot"
// Copy the SECRET KEY (not the site key)
// ─────────────────────────────────────────
$RECAPTCHA_SECRET = '6LfjEt8sAAAAAJjYTxPNa77xxiASaFKRcIjaO36H';

// ─────────────────────────────────────────
// Parse input
// ─────────────────────────────────────────
$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

$name = isset($data['name']) ? htmlspecialchars(strip_tags(trim($data['name']))) : '';
$email = isset($data['email']) ? htmlspecialchars(strip_tags(trim($data['email']))) : '';
$subject = isset($data['subject']) ? htmlspecialchars(strip_tags(trim($data['subject']))) : 'General Inquiry';
$message = isset($data['message']) ? htmlspecialchars(strip_tags(trim($data['message']))) : '';
$recaptcha_token = isset($data['recaptcha_token']) ? trim($data['recaptcha_token']) : '';

// ─────────────────────────────────────────
// Validate fields
// ─────────────────────────────────────────
if (empty($name) || empty($email) || empty($message)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Name, email and message are required.']);
  exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
  exit();
}

if (empty($recaptcha_token)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'message' => 'Please complete the reCAPTCHA.']);
  exit();
}

// ─────────────────────────────────────────
// Verify reCAPTCHA v2 with Google
// ─────────────────────────────────────────
$verify_url = 'https://www.google.com/recaptcha/api/siteverify';
$verify_data = http_build_query([
  'secret' => $RECAPTCHA_SECRET,
  'response' => $recaptcha_token,
  'remoteip' => $_SERVER['REMOTE_ADDR'],
]);

$verify_opts = [
  'http' => [
    'method' => 'POST',
    'header' => 'Content-Type: application/x-www-form-urlencoded',
    'content' => $verify_data,
  ],
];

$verify_result = file_get_contents($verify_url, false, stream_context_create($verify_opts));
$verify_json = json_decode($verify_result, true);

// reCAPTCHA v2: success is simply true or false (no score needed)
if (!$verify_json['success']) {
  http_response_code(403);
  echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed. Please try again.']);
  exit();
}


// Go High Level Setup

// ─────────────────────────────────────────
// Send Lead to GoHighLevel
// ─────────────────────────────────────────

$GHL_TOKEN = 'pit-fd6d0468-a3ca-4619-bdd3-e64203bdf25d';
$GHL_LOCATION_ID = 'T8KljLDghRE8uV1mrPrz';

$ghl_payload = json_encode([
  'firstName' => $name,
  'email' => $email,
  'locationId' => $GHL_LOCATION_ID,
  'tags' => ['Website Contact'],
  'source' => 'Website Contact Form'
]);

$ch = curl_init('https://services.leadconnectorhq.com/contacts/upsert');

curl_setopt_array($ch, [
  CURLOPT_POST => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_HTTPHEADER => [
    'Authorization: Bearer ' . $GHL_TOKEN,
    'Content-Type: application/json',
    'Version: 2021-07-28'
  ],
  CURLOPT_POSTFIELDS => $ghl_payload
]);

$ghl_response = curl_exec($ch);
$ghl_error = curl_error($ch);

curl_close($ch);

// Optional debugging
// file_put_contents('ghl-log.txt', $ghl_response);



// ─────────────────────────────────────────
// Email config
// ─────────────────────────────────────────
$to = 'contact@webxautomation.in'; // ← where you receive emails
$fromName = 'webxautomation Media Website';
$emailSubject = 'New Inquiry: ' . $subject . ' — from ' . $name;

$body = '
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f4; margin: 0; padding: 0; }
    .wrapper { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
    .header { background: linear-gradient(135deg, #D6008D, #732c7c); padding: 32px 40px; }
    .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; }
    .header p  { color: rgba(255,255,255,0.7); margin: 6px 0 0; font-size: 13px; }
    .body { padding: 40px; }
    .field { margin-bottom: 24px; }
    .field label { display: block; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #D6008D; margin-bottom: 6px; }
    .field p { margin: 0; color: #1a0a2e; font-size: 15px; line-height: 1.6; background: #f9f5ff; border-left: 3px solid #D6008D; padding: 12px 16px; border-radius: 0 8px 8px 0; }
    .verified { display: inline-block; padding: 3px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; background: #e8f5e9; color: #2e7d32; }
    .footer { background: #f9f5ff; padding: 20px 40px; text-align: center; }
    .footer p { margin: 0; font-size: 12px; color: #4a3560; }
    .footer strong { color: #D6008D; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>New Contact Form Submission</h1>
      <p>webxautomation · webxautomation.in</p>
    </div>
    <div class="body">
      <div class="field"><label>Name</label><p>' . $name . '</p></div>
      <div class="field"><label>Email</label><p>' . $email . '</p></div>
      <div class="field"><label>Inquiry Type</label><p>' . ($subject ?: 'Not specified') . '</p></div>
      <div class="field"><label>Message</label><p>' . nl2br($message) . '</p></div>
      <div class="field">
        <label>reCAPTCHA</label>
        <p><span class="verified">✓ Verified Human (reCAPTCHA v2 passed)</span></p>
      </div>
    </div>
    <div class="footer"><p>Sent from <strong>webxautomation.in</strong> contact form</p></div>
  </div>
</body>
</html>
';

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: {$fromName} <noreply@yourdomain.com>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = mail($to, $emailSubject, $body, $headers);

if ($sent) {
  http_response_code(200);
  echo json_encode(['success' => true, 'message' => 'Message sent successfully.']);
} else {
  http_response_code(500);
  echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again.']);
}
?>