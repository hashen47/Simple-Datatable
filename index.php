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
									<th>Approved Amount</th>
									<th>Estimate Amount</th>
									<th>Cumilation Expenditure</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>20</td>
									<td>20</td>
									<td>20</td>
								</tr>
								<tr>
									<td>20</td>
									<td>20</td>
									<td>20</td>
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
	t.add_to_footer([
		{ index : 0, topic : "Approved Amount", bg : "info" }, 
		{ index : 1, topic : "Estimate Amount", bg : "warning" }, 
		{ index : 2, topic : "Cumilative Expenditure", bg : "success" }, 
		{ index : 2, topic : "Cumilative Expenditure", bg : "success" }, 
	])
</script>
</html>
