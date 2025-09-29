<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ResetPassword extends Notification
{
    use Queueable;

    public $token;

    /**
     * Create a new notification instance.
     *
     * @param  string  $token
     * @return void
     */
    public function __construct($token)
    {
        $this->token = $token;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        // Customize the reset URL
        $url = url(config('app.url').'/auth/reset-password?token='.$this->token.'&email='.urlencode($notifiable->email));

        return (new MailMessage)
            ->subject('[UMS] Email Reset Password')
            ->greeting('Halo '.$notifiable->name)
            ->line('Kami menerima permintaan untuk mereset password akun Anda di sistem SSO PT Sarana Multi Infrastruktur. Jika Anda yang mengajukan permintaan ini, silakan klik link berikut untuk mengatur ulang password Anda:')
            ->action('Reset Password', $url)
            ->line('Jika Anda tidak mengajukan permintaan ini, abaikan email ini. Jika Anda memerlukan bantuan lebih lanjut, jangan ragu untuk menghubungi tim DTI PT SMI di winny@ptsmi.co.id , irenne@ptsmi.co.id , winda@ptsmi.co.id , rifqi@ptsmi.co.id')
            ->salutation('Terima kasih, Tim IT PT Sarana Multi Infrastruktur');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
