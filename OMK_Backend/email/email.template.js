function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
  
  <!-- Header -->
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
    <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">OurMoments</h1>
    <p style="margin: 0; font-size: 16px; opacity: 0.9; font-weight: 300;">Kolkata • Photography Services</p>
  </div>
  
  <!-- Main Content -->
  <div style="padding: 40px 30px;">
    
    <!-- Greeting -->
    <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #2c3e50; text-align: center;">Email Verification</h2>
    
    <!-- Message -->
    <p style="margin: 0 0 30px 0; font-size: 16px; color: #5a6c7d; line-height: 1.6; text-align: center;">
      Thank you for joining OurMoments Kolkata! Please use the verification code below to complete your registration.
    </p>
    
    <!-- Verification Code -->
    <div style="background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); border-radius: 12px; padding: 30px; margin: 30px 0; text-align: center;">
      <p style="margin: 0 0 10px 0; font-size: 14px; color: white; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Your Verification Code</p>
      <div style="font-size: 32px; font-weight: bold; color: white; letter-spacing: 3px; font-family: 'Courier New', monospace; text-shadow: 0 2px 4px rgba(0,0,0,0.2);">
        ${verificationCode}
      </div>
    </div>
    
    <!-- Expiry Notice -->
    <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
      <p style="margin: 0; font-size: 14px; color: #856404; font-weight: 500;">
        ⏰ This code expires in 10 minutes
      </p>
    </div>
    
    <!-- Security Note -->
    <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
      <p style="margin: 0; font-size: 14px; color: #6c757d; line-height: 1.5;">
        <strong>Security Note:</strong> If you didn't request this verification, please ignore this email. Keep this code confidential.
      </p>
    </div>
    
  </div>
  
  <!-- Footer -->
  <div style="background: #2c3e50; padding: 30px; text-align: center; color: white;">
    <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #4ecdc4;">OurMoments Kolkata</p>
    <p style="margin: 0 0 4px 0; font-size: 14px; color: #bdc3c7;">Capturing your precious moments</p>
    <p style="margin: 0 0 20px 0; font-size: 14px; color: #bdc3c7;">📍 Kolkata, West Bengal</p>
    <div style="border-top: 1px solid #34495e; padding-top: 20px;">
      <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
        This is an automated message. Please do not reply to this email.<br>
        © 2025 OurMoments Kolkata. All rights reserved.
      </p>
    </div>
  </div>
  
</div>
  `;
}

function resetPasswordTemplate (resetPasswordUrl){
    return `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background-color: #ffffff; border: 1px solid #e1e5e9; border-radius: 8px; overflow: hidden;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; color: white;">
        <h1 style="margin: 0 0 8px 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">OurMoments</h1>
        <p style="margin: 0; font-size: 16px; opacity: 0.9; font-weight: 300;">Kolkata • Photography Services</p>
      </div>
      
      <!-- Main Content -->
      <div style="padding: 40px 30px;">
        
        <!-- Greeting -->
        <h2 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #2c3e50; text-align: center;">Reset Your Password</h2>
        
        <!-- Message -->
        <p style="margin: 0 0 20px 0; font-size: 16px; color: #5a6c7d; line-height: 1.6;">
          Hello,
        </p>
        
        <p style="margin: 0 0 30px 0; font-size: 16px; color: #5a6c7d; line-height: 1.6;">
          We received a request to reset your password for your OurMoments Kolkata account. If you made this request, please click the button below to reset your password.
        </p>
        
        <!-- Reset Password Button -->
        <div style="text-align: center; margin: 40px 0;">
          <a href="${resetPasswordUrl}" style="display: inline-block; background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%); color: white; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-size: 16px; font-weight: 600; text-align: center; box-shadow: 0 4px 12px rgba(68, 160, 141, 0.3); transition: all 0.3s ease;">
            Reset My Password
          </a>
        </div>
        
        <!-- Alternative Link -->
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 30px 0;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #6c757d; font-weight: 500;">
            If the button doesn't work, copy and paste this link into your browser:
          </p>
          <p style="margin: 0; font-size: 14px; color: #4ecdc4; word-break: break-all; font-family: 'Courier New', monospace; background: white; padding: 10px; border-radius: 4px; border: 1px solid #e1e5e9;">
            ${resetPasswordUrl}
          </p>
        </div>
        
        <!-- Expiry Notice -->
        <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px; padding: 15px; margin: 20px 0; text-align: center;">
          <p style="margin: 0; font-size: 14px; color: #856404; font-weight: 500;">
            ⏰ This link expires in 1 hour for your security
          </p>
        </div>
        
        <!-- Security Note -->
        <div style="background: #f8f9fa; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 15px 0; font-size: 14px; color: #6c757d; line-height: 1.5;">
            <strong>Security Note:</strong> If you didn't request a password reset, please ignore this email. Your account remains secure.
          </p>
          <p style="margin: 0; font-size: 14px; color: #6c757d; line-height: 1.5;">
            If you continue to receive these emails, please contact our support team immediately.
          </p>
        </div>
        
        <!-- Tips Section -->
        <div style="background: #e8f5e9; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; font-size: 14px; color: #2e7d32; font-weight: 600;">
            🔒 Password Security Tips:
          </p>
          <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #2e7d32; line-height: 1.5;">
            <li>Use a strong, unique password</li>
            <li>Include uppercase, lowercase, numbers, and symbols</li>
            <li>Avoid using personal information</li>
            <li>Consider using a password manager</li>
          </ul>
        </div>
        
      </div>
      
      <!-- Footer -->
      <div style="background: #2c3e50; padding: 30px; text-align: center; color: white;">
        <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600; color: #4ecdc4;">OurMoments Kolkata</p>
        <p style="margin: 0 0 4px 0; font-size: 14px; color: #bdc3c7;">Capturing your precious moments</p>
        <p style="margin: 0 0 20px 0; font-size: 14px; color: #bdc3c7;">📍 Kolkata, West Bengal</p>
        <div style="border-top: 1px solid #34495e; padding-top: 20px;">
          <p style="margin: 0 0 10px 0; font-size: 12px; color: #7f8c8d;">
            Need help? Contact us at: <a href="mailto:support@ourmoments-kolkata.com" style="color: #4ecdc4; text-decoration: none;">support@ourmoments-kolkata.com</a>
          </p>
          <p style="margin: 0; font-size: 12px; color: #7f8c8d;">
            This is an automated message. Please do not reply to this email.<br>
            © 2025 OurMoments Kolkata. All rights reserved.
          </p>
        </div>
      </div>
      
    </div>`
}

module.exports = {
  generateEmailTemplate,
  resetPasswordTemplate
};