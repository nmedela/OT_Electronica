CREATE TABLE clients (id serial,name VARCHAR(32), tel varchar(15),tel2 varchar(15),
mail VARCHAR(32),mail2 VARCHAR(32),direction VARCHAR(32),location VARCHAR(32), cancel bool default false );

CREATE TABLE equipments (id serial ,title varchar(15));
CREATE TABLE status (id serial,title varchar(15),icon varchar(15), color varchar(10));

CREATE TABLE work_orders (id serial, insert_time datetime, 
code varchar(32),client_id bigint(20),admission_date date,equipment_id int,brand varchar(20),model varchar(20),
serial_number varchar(32),failure varchar(32),last_status date, last_observation varchar(32), deliver_date date,
warranty int, final_amount double, cancel boolean default false);

CREATE TABLE history (id serial, id_wo bigint(20), date_status date, id_status int ,observation varchar(32));

ALTER TABLE history
MODIFY column id_wo bigint(20) unsigned;
ALTER TABLE history
MODIFY column id_status integer unsigned;
ALTER TABLE history
ADD column insert_time datetime;

ALTER TABLE work_orders
MODIFY column client_id bigint(20) unsigned;

ALTER TABLE work_orders
MODIFY column equipment_id integer unsigned;
ALTER TABLE work_orders
MODIFY column last_status integer unsigned;

ALTER TABLE equipments
MODIFY column id integer unsigned primary key;
ALTER TABLE equipments
MODIFY COLUMN title varchar(25);
ALTER TABLE status
MODIFY column id integer unsigned primary key;
ALTER TABLE status
MODIFY column title varchar(25);