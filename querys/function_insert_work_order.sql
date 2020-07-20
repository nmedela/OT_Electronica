CREATE FUNCTION `insert_work_order` (arg_client_id bigint(20), arg_admission_date date, arg_equipment_id int(10), arg_brand varchar(20), arg_model varchar(20), arg_serial_number varchar(32), arg_failure varchar(50), arg_last_status int(10), arg_last_observation varchar(50), arg_deliver_date date,arg_warranty int(11),  arg_final_amount double)
RETURNS INTEGER
BEGIN
insert into work_orders (client_id,admission_date, equipment_id, brand, model, serial_number,failure,last_status,last_observation,arg_deliver_date ,arg_warranty ,  arg_final_amount) values(arg_client_id , arg_admission_date , arg_equipment_id , arg_brand , arg_model , arg_serial_number , arg_failure , arg_last_status , arg_last_observation, arg_deliver_date,arg_warranty,  arg_final_amount);
RETURN 1;
END
