import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: true, // true pour 465, false pour d'autres ports
      auth: {
        user: 'lirsitogo2021@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'phlelzqtfdpuvalx', // Remplacez par votre mot de passe
      },
    });
  }

  async sendWelcomeEmail(to: string, name: string) {
    const mailOptions = {
      from: '"DS EDUCATION" <your-email@example.com>', // Adresse de l'expéditeur
      to,
      subject: 'Bienvenue sur notre application !',
      text: `Bonjour ${name},\n\nMerci de vous être inscrit sur notre application !\n\nCordialement,\nL'équipe de votre application`,
      // html: `<p>Bonjour ${name},</p><p>Merci de vous être inscrit sur notre application !</p><p>Cordialement,<br>L'équipe de votre application</p>`,
      html: `
      <!DOCTYPE html>
      <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

      <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!-->
        <link href="https://fonts.googleapis.com/css2?family=Bitter:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css">
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@100;200;300;400;500;600;700;800;900" rel="stylesheet" type="text/css"><!--<![endif]-->
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            margin: 0;
            padding: 0;
          }

          a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
          }

          #MessageViewBody a {
            color: inherit;
            text-decoration: none;
          }

          p {
            line-height: inherit
          }

          .desktop_hide,
          .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
          }

          .image_block img+div {
            display: none;
          }

          sup,
          sub {
            font-size: 75%;
            line-height: 0;
          }

          @media (max-width:620px) {

            .desktop_hide table.icons-inner,
            .social_block.desktop_hide .social-table {
              display: inline-block !important;
            }

            .icons-inner {
              text-align: center;
            }

            .icons-inner td {
              margin: 0 auto;
            }

            .image_block div.fullWidth {
              max-width: 100% !important;
            }

            .mobile_hide {
              display: none;
            }

            .row-content {
              width: 100% !important;
            }

            .stack .column {
              width: 100%;
              display: block;
            }

            .mobile_hide {
              min-height: 0;
              max-height: 0;
              max-width: 0;
              overflow: hidden;
              font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
              display: table !important;
              max-height: none !important;
            }
          }
        </style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
      </head>

      <body class="body" style="background-color: #f9f9f9; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
        <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f9f9f9; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7411/Header_image_Back_to_School_2.png'); background-position: top center; background-size: auto; background-repeat: no-repeat;">
          <tbody>
            <tr>
              <td>
                <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 600px; margin: 0 auto;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 30px; vertical-align: top;">
                                <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:20px;width:100%;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div style="max-width: 152px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7411/Bee_School_Logo.png" style="display: block; height: auto; border: 0; width: 100%;" width="152" alt="Bee School logo" title="Bee School logo" height="auto"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="divider_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:35px;padding-left:10px;padding-right:10px;padding-top:10px;">
                                      <div class="alignment" align="center">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="85%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 2px solid #F2C9E3;"><span style="word-break: break-word;">&#8202;</span></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="image_block block-3" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="padding-bottom:30px;width:100%;padding-right:0px;padding-left:0px;">
                                      <div class="alignment" align="center" style="line-height:10px">
                                        <div class="fullWidth" style="max-width: 480px;"><img src="https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7411/Back_to_school_header_main_image_2.png" style="display: block; height: auto; border: 0; width: 100%;" width="480" alt="Child with backpack" title="Child with backpack" height="auto"></div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="heading_block block-4" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad" style="text-align:center;width:100%;">
                                      <h1 style="margin: 0; color: #2449a8; direction: ltr; font-family: 'Bitter', Georgia, Times, 'Times New Roman', serif; font-size: 40px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 48px;"><span class="tinyMce-placeholder" style="word-break: break-word;">Bienvenue sur DS Education!</span></h1>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad" style="padding-left:10px;padding-right:15px;padding-top:15px;">
                                      <div style="color:#12275a;direction:ltr;font-family:'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:18px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:21.599999999999998px;">
                                        <p style="margin: 0;"> Merci de vous être inscrit sur notre application ! </p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="button_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <p>Cordialement,<br>L'équipe de votre application</p>
                                </table>
                                <div class="spacer_block block-7" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-position: center top;">
                  <tbody>
                    <tr>
                      <td>
                        <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #fff7fb; color: #000000; width: 600px; margin: 0 auto;" width="600">
                          <tbody>
                            <tr>
                              <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; background-color: #fcfcfc; padding-bottom: 25px; padding-left: 25px; padding-right: 25px; padding-top: 45px; vertical-align: top;">
                                <table class="social_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="pad">
                                      <div class="alignment" align="center">
                                        <table class="social-table" width="184px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
                                          <tr>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.facebook.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/facebook@2x.png" width="32" height="auto" alt="Facebook" title="facebook" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.twitter.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/twitter@2x.png" width="32" height="auto" alt="Twitter" title="twitter" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.linkedin.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/linkedin@2x.png" width="32" height="auto" alt="Linkedin" title="linkedin" style="display: block; height: auto; border: 0;"></a></td>
                                            <td style="padding:0 7px 0 7px;"><a href="https://www.instagram.com" target="_blank"><img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="32" height="auto" alt="Instagram" title="instagram" style="display: block; height: auto; border: 0;"></a></td>
                                          </tr>
                                        </table>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#66787f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                                <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                  <tr>
                                    <td class="pad">
                                      <div style="color:#66787f;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;font-size:14px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                        <p style="margin: 0; word-break: break-word;"><a href=" http://www.example.com" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">Contact Us</a> | <a href=" http://www.example.com" target="_blank" style="text-decoration: underline; color: #0068a5;" rel="noopener">Unsubscribe</a></p>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </body>

      </html>
      `,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
