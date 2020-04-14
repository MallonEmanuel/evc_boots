

/*
  Puerto Madryn - (Latitude, Longitude): -42.7667 , -65.05  =>  -42.7667,-65.05,5km
  La plata - Buenos Aires 	             -34.920345	-57.969559  =>  -34.920345,-57.969559,10km
  Wuhan, the city where the coronavirus outbreak began	         =>  30.583332,114.283333,20km
  geocode:40.714353,-74.00597299999998,20km
  #btv geocode:39.8,-95.583068847656,2500km
  -RT -election power OR #vtsandy OR #vtresponse OR #frankenstorm

  Emanuel                    -  @Emanuel41243617

  Movilidad y Transporte PM  -  @emanuelsm18
*/


-- busqueda por palabra
http://localhost:3000/buscar?q=cuarentena&hastag=N
-- busqueda con hastag
http://localhost:3000/buscar?q=COVID19&hastag=S
-- busqueda con ubicacion (puede fallar)
-- Wuhan
http://localhost:3000/buscar?q=covid19&geocode=30.583332,114.283333,20km&hastag=N
-- La Plata
http://localhost:3000/buscar?q=covid19&geocode=-34.920345,-57.969559,10km&hastag=N
Puerto Madryn
http://localhost:3000/buscar?q=covid19&geocode=-42.7667,-65.05,5km&hastag=N


-- retweet (usar tweets buscados)
http://localhost:3000/retweet?tweet_id=1247538348861743112


tweets
-- enviar tweet
http://localhost:3000/tweet?status=2020-04-Pruebas de Bot
-- Mencionar a alguien
http://localhost:3000/tweet?status=2020-04 @Emanuel41243617

RT @Moni_Saso: #DiaMundialDeLaSalud\nHoy nuestro reconocimiento y pleno agradecimiento a los trabajadorxs de la salud👩‍⚕️👨‍🔬 \nGracias🤲 por s…

2020-04-07

1. Como realiza la busqueda por geocode
2. Guardar todo el texto de las busquedas
3. Armar maquina virtual (para conexion SSH)
