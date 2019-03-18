@component('mail::message')

Hi {{$username}}, <br/>
Your task has been updated! <br/>
Description: <br/>
{{$task->description}} <br/>
Starts at: {{$task->at}} <br/>


@component('mail::button', ['url' => '/wms.loc'])
WMS
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
