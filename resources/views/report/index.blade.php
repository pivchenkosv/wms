
<div class="container">
@foreach ($reports as $report)
{{ $report->id }}
@endforeach
</div>

{{ $reports->links() }}
