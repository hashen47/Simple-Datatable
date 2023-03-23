<!DOCTYPE html>
<html lang="en-US">

<head>
	<title>Data Table</title>
	<link rel="stylesheet" href="dist/css/bootstrap.min.css" />
	<link rel="stylesheet" href="data-table-scratch.css" />
</head>

<body>
	<div class="container">
		<div class="row">
			
			<div class="col">
				<div id="test" class="card table-scratch">

					<!-- card body -->
					<div class="card-body">
						<table class="table table-bordered table-hover table-light table-large">
							<thead>
								<tr>
									<th>One</th>
									<th>Two</th>
									<th>Three</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>One</td>
									<td>Two</td>
									<td>Three</td>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- /card body -->

				</div>
			</div>
		</div>
	</div>
</body>
<script src="dist/js/bootstrap.min.js"></script>
<script src="./data-table-scratch.js"></script>
<script type="text/javascript">
	const t = new Table("test")
</script>
</html>
