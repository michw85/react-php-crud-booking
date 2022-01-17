# Mini application for booking rooms
---
![alt text](src/img/screen1.jpg "Screen of Header(Navigation)/Footer, InsertForm, Table and SearchForm")

---

## Stack of technology:

* react
* php
* mySQL
* CRUD
* web API 
* Libraries: bootstrap, materialize

---

## SQL

Database name – react_php_crud
log/pas: root
Table name – rooms

---

SQL code to create the rooms table and the structure of the rooms table:
CREATE TABLE `react_php_crud`.`rooms` ( `id` INT(11) NOT NULL AUTO_INCREMENT , `title` VARCHAR(255) NULL DEFAULT NULL , `price` BIGINT(11) NULL DEFAULT NULL , `description` TEXT NULL DEFAULT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

---

INSERT INTO `rooms` (`id`, `title`, `price`, `description`) VALUES (NULL, 'Single room', '100', 'these rooms are assigned to one person or a couple. It may have one or more beds, but the size of the bed depends on the hotel. Some single rooms have a twin bed, most will have a double, few will have a queen bed.');
INSERT INTO `rooms` (`id`, `title`, `price`, `description`) VALUES (NULL, 'Double room', '200', 'double rooms are assigned to two people; expect one double bed, or two twin beds depending on the hotel.');
INSERT INTO `rooms` (`id`, `title`, `price`, `description`) VALUES (NULL, 'Triple room', '300', 'as the name might suggest, this room is equipped for three people to stay. The room will have a combination of either three twin beds, one double bed and a twin, or two double beds.');
INSERT INTO `rooms` (`id`, `title`, `price`, `description`) VALUES (NULL, 'Quad room', '400', 'a quad room is set up for four people to stay comfortably. This means the room will have two double beds. Some, however, may be set up dormitory-style with bunks or twins, so check with the property to make sure.');
INSERT INTO `rooms` (`id`, `title`, `price`, `description`) VALUES (NULL, 'Double-double', '500', 'these rooms have two double beds (sometimes two queen beds) and are meant to accommodate two to four people, especially families traveling with young kids.');
INSERT INTO `rooms` (`id`, `title`, `price`, `description`) VALUES (NULL, 'Queen', '600', 'A room with a queen-sized bed. May be occupied by one or more people.');

---

## PHP

### db_connection.php
<?php

// database connection
$db_conn = mysqli_connect("localhost","root","root","react_php_crud");

if (!$db_conn){
    // stops code execution on error
    die('Error connect to database');
}

### all-rooms.php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$allRooms = mysqli_query($db_conn, "SELECT * FROM `rooms`");
if (mysqli_num_rows($allRooms) > 0) {
    $all_rooms = mysqli_fetch_all($allRooms, MYSQLI_ASSOC);
    echo json_encode(["success" => 1, "rooms" => $all_rooms]);
} else {
    echo json_encode(["success" => 0]);
}

### add-room.php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

// POST DATA
$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->title)
    && isset($data->price)
    && isset($data->description)
    && !empty(trim($data->title))
    && !empty(trim($data->price))
    && !empty(trim($data->description))
) {
    $title = mysqli_real_escape_string($db_conn, trim($data->title));
    $price = mysqli_real_escape_string($db_conn, trim($data->price));
    $description = mysqli_real_escape_string($db_conn, trim($data->description));

    $insertRoom = mysqli_query($db_conn, "INSERT INTO `rooms`(`title`,`price`,`description`) VALUES('$title','$useremail','$description')");
    if ($insertRoom) {
        $last_id = mysqli_insert_id($db_conn);
        echo json_encode(["success" => 1, "msg" => "Room Inserted.", "id" => $last_id]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Room Not Inserted!"]);
    }

} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}

### update-room.php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id)
    && isset($data->title)
    && isset($data->price)
    && isset($data->description)
    && is_numeric($data->id)
    && !empty(trim($data->title))
    && !empty(trim($data->price))
    && !empty(trim($data->description))
) {
    $title = mysqli_real_escape_string($db_conn, trim($data->title));
    $price = mysqli_real_escape_string($db_conn, trim($data->price));
    $description = mysqli_real_escape_string($db_conn, trim($data->description));
    $updateRoom = mysqli_query($db_conn, "UPDATE `rooms` SET `title`='$title', `price`='$price', `description`='$description' WHERE `id`='$data->id'");
    if ($updateRoom) {
        echo json_encode(["success" => 1, "msg" => "Room Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Room Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}

### delete-room.php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id) && is_numeric($data->id)) {
    $delID = $data->id;
    $deleteRoom = mysqli_query($db_conn, "DELETE FROM `rooms` WHERE `id`='$delID'");
    if ($deleteRoom) {
        echo json_encode(["success" => 1, "msg" => "Room Deleted"]);
    } else {
        echo json_encode(["success" => 0, "msg" => "Room Not Found!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Room Not Found!"]);
}

## Options
---
![alt text](src/img/screen2.jpg "Insert and Edit information to DataBase")
## Available Scripts
---
![alt text](src/img/screen3.jpg "Search room")

---
![alt text](src/img/screen4.jpg "More information and 'Booking room'")

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
