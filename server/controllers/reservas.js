// Invocar al modo JavaScript 'strict'
'use strict';

var reserva = require('mongoose').model('Reserva');

exports.mostrar = function(req, res){
	var fecha=req.params.fecha;
	reserva.find({fecha_reserva:fecha}).exec(function(error,reservas){
		if(error){
			return res.send(error);
		}
		return res.json(reservas);
	});
};
exports.crear = function(req, res, next){

	var reservas = new reserva(req.body);

	reservas.save(function(err){
		if (err) {
			console.log(err);
			return res.next(err);
		} else {
			console.log(reservas);
			res.json(reservas);
		}
	});
};

exports.getHorario = function (req,res) {
	reserva.find({}).populate('paciente_id','firstName').populate('medico_id','nombre').
	exec(function(err,hora){
		if(err) res.send('error');
		console.log(hora);
		res.json(hora);
	});
};

exports.listByFecha_Medico = function(req, res) {
	// Usar el método model 'find' para obtener una lista de facturas
	reserva.find({
		fecha_reserva: req.fecha,
		 medico_id: req.id_medico
		  // hora_inicio_reserva: req.id_medico
	 }).populate('paciente_id','firstName').exec(function(err, horas){
		if(err){
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			console.log("encontro esto:")
			console.log(horas);
			res.json(horas);
		}
	});
};

exports.paramFecha = function(req, res, next, _fecha){
	req.fecha = _fecha;
	next();
};
exports.paramMedico = function(req, res, next, _id_medico){
	req.id_medico = _id_medico;
	next();
};