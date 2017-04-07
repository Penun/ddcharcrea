{{template "includes/header.tpl"}}
<body>
	<br />
	<br />
	<div ng-controller="loginController as logCont">
		<div ng-show="logCont.loginFailed" id="loginFailed"><h2>Login Failed</h2></div>
		<form id="loginForm" name="loginForm" ng-submit="loginForm.$valid && logCont.tryLogin()" novalidate>
			<br />
			<p><label for="userName">Username:</label><input type="text" name="userName" ng-model="logCont.login.user_name" required/></p>
			<p><label for="password">Password:</label><input type="password" name="password" ng-model="logCont.login.password" required/></p>
			<br />
			<button type="submit" name="submit">Login</button>
		</form>
	</div>
</body>
</html>
