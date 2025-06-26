@component('mail::message')
Name: {{ $name }}
Email: {{ $email }}<br>
Subject: {{ $sub }} <br><br>
Message:<br> {{ $mess }}

<a href='{{$link}}'>klik disini</a>

Thanks,
{{ config('app.name') }}
@endcomponent