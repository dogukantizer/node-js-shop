create database billboard;
\c billboard
create table hot100 (
    rank int,
    title text,
    artist text
);

insert into hot100 values
(1, 'Des', 'Lus'),
(2, 'Asd', 'Jue'),
(3, 'Kir', 'Qwe'),
(4, 'Ser', 'Zxc'),
(5, 'Asr', 'Klo'),
(6, 'Poe', 'Ghj');

create table users (
    username text,
    password text
);

insert into users values
('ann', 'password'),
('ben', '12345678');
