
<?php
session_start();

$_SESSION['message'] = '';
$mysqli = new mysqli('localhost', 'root', 'pass', 'cslogin');

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	// $_SESSION['message'] = 'ROB';
	$email = $mysqli->real_escape_string($_POST['email']);
	$first = $mysqli->real_escape_string($_POST['first']);
	$last = $mysqli->real_escape_string($_POST['last']);

	$sql = "INSERT INTO users (first, last, email)" . "VALUES ('$first', '$last', '$email')";
	if($mysqli->query($sql) === true)
		{
			$_SESSION['message'] = "Registration successful! Added $first to database!";
		}
		else $_SESSION['message'] = "User not added successfully!";
}
?>


<html>
<head>
	<title>Circles</title>
	
	<!--BoOnK-StRaP css-->
	<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

	<!-- personal stylesheet -->
	<link text = 'text/css' rel = 'stylesheet' href='assets/css/style.css'>
</head>
<body>
	<div id='sign'>
		<h1>Wanna make this form in 5 seconds? Join CS Club! <!--span class='typed'></span--></h1>
		<h1 class='msg'> <?= $_SESSION['message']?> </h1>

		<!-- BoOnK-StRaP form form docs -->
		<form action='index.php' method='POST' enctype='multipart/form-data' autocomplete='off'>
		  <div class="form-group">
		    <label for="exampleInputPassword1">First Name</label>
		    <input type="text" class="form-control" name='first' id="first" placeholder="Foo" required>
		  </div>
		  <div class="form-group">
		    <label for="exampleInputPassword1">Last Name</label>
		    <input type="text" class="form-control" name='last' id="last" placeholder="Bar" required>
		  </div>
		  <div class="form-group">
		    <label for="exampleInputEmail1">Email address</label>
		    <input type="email" class="form-control" name = 'email' id="email" placeholder="foobar@gmail.com" required>
		  </div>
		  <input type="submit" value="Submit" class="btn btn-default">
		</form>

	</div>

	<!-- canvas for Paperscript -->
	<canvas id="myCanvas" resize></canvas>


	<!-- boOnK-strap css -->
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

	<!--jQuery -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	
	<!-- Howler --> 
	<script src="https://cdnjs.cloudflare.com/ajax/libs/howler/2.0.14/howler.core.min.js"></script>
	
	<!--Paperscript -->
	<script type='text/paperscript' src='assets/js/signup.js' canvas='myCanvas'></script>

	<!--paper js-->
	<script type='text/javascript' src='assets/js/paper-full.js'></script>


</body>
</html>