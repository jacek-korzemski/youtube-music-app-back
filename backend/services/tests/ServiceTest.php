<?php 

// Basic test class to check if everything is loaded fine, and to see, if the engine can read data from .env file.

class ServiceTest
{
  public function __construct()
  {
    if (isset($_SERVER["SQL_HOST"])) 
    {
      echo "Database host: ". $_SERVER["SQL_HOST"] . "<br/>";
      echo ".env file is readable. <br/>";
    } 
    else 
    {
      throw new Error 
      (`
        It seems that something is wrong with your .env file, 
        or with the API engine itself and the global variable 
        cannot be read.
      `);
    }

    $json = new ServiceJson();
    $sql  = new ServiceSql();

    if ($json->test()) 
    {
      echo "Basic service test: " . $json->test() . "<br/>";
      echo "Basic service works fine. <br/>";
    } 
    else 
    {
      throw new Error 
      (`
        There is some issues with basic service. 
        Try to install engine again or check your 
        services/tests folder.
      `);
    }

    if ($sql->test()) 
    {
      echo "Basic SQL service test: " .$sql->test() . "<br/>";
      echo "Basic SQL service and SQL service connection works fine";
    }
    else 
    {
      throw new Error 
      (`
        There is some issues with SQL service. 
        Try to install engine again or check your 
        services/tests folder, your .env file or your
        SQL database.
      `);
    }
    echo '<br/><br/>';
    echo 'Login test form: <br/>';
    echo '
      <form method="POST" action="login">
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <input type="submit" value="login" />
      </form>
      <br/>
    ';

    echo '<br/><br/>';
    echo 'logout test form: <br/>';
    echo '
      <form method="POST" action="logout">
        <input type="text" placeholder="userId" name="userId" />
        <input type="text" placeholder="token" name="token" />
        <input type="submit" value="logout" />
      </form>
      <br/>
    ';

    echo '<br/><br/>';
    echo 'token validation test: <br/>';
    echo '
      <form method="POST" action="auth">
        <input type="text" placeholder="userId" name="userId" />
        <input type="text" placeholder="token" name="token" />
        <input type="submit" value="test authentication" />
      </form>
      <br/>
    ';
  }
}