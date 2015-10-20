var myRover1 = {
	name: "RoverUSA",
	potencialPosition: [], //este valor se utiliza previo a chequear si hay o no obstáculos
	position: [0,0], 
	direction: 'N',
	trace: [[0,0]] //almacena la ruta que genera el objeto
};

var myRover2 = {
	name: "RoverURRSS",
	potencialPosition: [],
	position: [9,9], 
	direction: 'S',
	trace: [[9,9]]
};

var obstacles = {
	name: "Obstacle",
	//poner todos los obstáculos que se quieran
	positions: [[4,4],[8,8],[3,2],[6,1],[7,2]],
};


function makeGrid(number){
	grid = new Array(number);
	for (x=0;x<number;x++){
		grid[x] = new Array(number);
		for (y=0;y<number;y++){
			grid[x][y] = [x, y];
		}
	}
	return grid;
}

function locateErase(rover){
	//Borra anterior localización de objetos
	x = rover.position[0];
	y = rover.position[1];
	gridXY[x][y] = rover.position;
}

function drawRover(rover){
	local = rover.position;
	label = rover.name;
	ns = local[0];
	we = local[1];
	gridXY[ns][we] = label;
	return gridXY;
}

function drawRoute(rover,symbroute){
	for (i=0; i<rover.trace.length; i++){
		local = rover.trace[i];
		ns = local[0];
		we = local[1];
		gridXY[ns][we] = symbroute;
	}
	drawRover(rover);
	return gridXY;
}

function locateObstacles(object){
	//busca las coordenadas de los obstáculos y sustituye por string "Obstacle"
	for (i=0; i<object.positions.length; i++){
		local = object.positions[i];
		ns = local[0];
		we = local[1];
		gridXY[ns][we] = object.name;
	}
	return gridXY;
}

function checkObstacles(rover,cachePosition){
	ns = cachePosition[0];
	we = cachePosition[1];
	if (typeof gridXY[ns][we] != typeof "string"){
		//no hay obstáculo, almacena nueva posición. hay movimiento
		rover.position = cachePosition;
	} else {
		//hay obstáculos, almacena la última posición válida. no hay movimiento
		lastValidValue = rover.trace.length - 1;
		rover.position = rover.trace[lastValidValue];
		alert(rover.name+": Avoid "+gridXY[ns][we]+" in coordinates: ["+cachePosition+"] ! ! !");
	}
}

function goForward(rover) {
  locateErase(rover);
  rover.potencialPosition = rover.position;
  switch(rover.direction) {
    case 'N':
      rover.potencialPosition[0]++;
      rover.potencialPosition[0] = (rover.potencialPosition[0] > 9) ? 0: rover.potencialPosition[0];
      break;
    case 'E':
      rover.potencialPosition[1]++;
      rover.potencialPosition[1] = (rover.potencialPosition[1] > 9) ? 0: rover.potencialPosition[1];
      break;
    case 'S':
      rover.potencialPosition[0]--;
      rover.potencialPosition[0] = (rover.potencialPosition[0] < 0) ? 9: rover.potencialPosition[0];
      break;
    case 'W':
      rover.potencialPosition[1]--;
      rover.potencialPosition[1] = (rover.potencialPosition[1] < 0) ? 9: rover.potencialPosition[1];
      break;
  };
  checkObstacles(rover,[rover.potencialPosition[0],rover.potencialPosition[1]])
  console.log("New "+rover.name+" position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  console.log("Direction: ["+rover.direction+"]");
  rover.trace.push([rover.position[0],rover.position[1]]);
  drawRover(rover);
}

function goBack(rover) {
  locateErase(rover);
  rover.potencialPosition = rover.position;
  switch(rover.direction) {
    case 'N':
      rover.potencialPosition[0]--;
      rover.potencialPosition[0] = (rover.potencialPosition[0] < 0) ? 9: rover.potencialPosition[0];
      break;
    case 'E':
      rover.potencialPosition[1]--;
      rover.potencialPosition[1] = (rover.potencialPosition[1] < 0) ? 9: rover.potencialPosition[1];
      break;
    case 'S':
      rover.potencialPosition[0]++;
      rover.potencialPosition[0] = (rover.potencialPosition[0] > 9) ? 0: rover.potencialPosition[0];
      break;
    case 'W':
      rover.potencialPosition[1]++;
      rover.potencialPosition[1] = (rover.potencialPosition[1] > 9) ? 0: rover.potencialPosition[1];
      break;
  };
  checkObstacles(rover,[rover.potencialPosition[0],rover.potencialPosition[1]])
  console.log("New "+rover.name+" position: [" + rover.position[0] + ", " + rover.position[1] + "]");
  console.log("Direction: ["+rover.direction+"]");
  rover.trace.push([rover.position[0],rover.position[1]]);
  drawRover(rover);
}

function turnRight(rover) {
  directions = ["N","E","S","W"];
  index = directions.indexOf(rover.direction);
  index++;
  index = (index == directions.length) ? 0: index;
  rover.direction = directions[index];
  
  console.log("Direction: ["+rover.direction+"]");
}

function turnLeft(rover) {
  directions = ["N","E","S","W"];
  index = directions.indexOf(rover.direction);
  index--;
  index = (index < 0) ? 3: index;
  rover.direction = directions[index];

  console.log("Direction: ["+rover.direction+"]");
}

function commands(rover,string){
	arrayCommands = string.split("")
	for (i=0;i<arrayCommands.length;i++){
		switch (arrayCommands[i]){
			case "f":
				goForward(rover);
			break;
			case "b":
				goBack(rover);
			break;
			case "r":
				turnRight(rover);
			break;
			case "l":
				turnLeft(rover);
			break;
		}
	}
}

//Creamos tablero, obstáculos y rovers
gridXY = makeGrid(10);
locateObstacles(obstacles);
drawRover(myRover1);
drawRover(myRover2);

//Ejecutamos comandos y dibujamos rutas de los rovers (para ver rutas lanzar en consola "gridXY")
commands(myRover1,"frflfrflfrflfrflfrflfrfl");
commands(myRover2,"frflfrflfrflfrflfrflfrfl");
drawRoute(myRover1,"====");
drawRoute(myRover2,"****");

//goBack(myRover1);
//turnRight(myRover1);
//turnLeft(myRover1);