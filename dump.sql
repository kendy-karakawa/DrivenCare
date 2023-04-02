--
-- PostgreSQL database dump
--

-- Dumped from database version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: statustype; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.statustype AS ENUM (
    'waiting',
    'canceled',
    'confirmed',
    'finished'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: schedules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schedules (
    id integer NOT NULL,
    doctor_id integer NOT NULL,
    patient_id integer NOT NULL,
    weekday character varying(10) NOT NULL,
    "time" time without time zone NOT NULL,
    status public.statustype DEFAULT 'waiting'::public.statustype NOT NULL
);


--
-- Name: schedules_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.schedules_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: schedules_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.schedules_id_seq OWNED BY public.schedules.id;


--
-- Name: specialties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.specialties (
    id integer NOT NULL,
    specialty character varying(100) NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: specialties_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.specialties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: specialties_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.specialties_id_seq OWNED BY public.specialties.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    email character varying(150) NOT NULL,
    password character varying(255) NOT NULL,
    location character varying(255) NOT NULL,
    is_doctor boolean DEFAULT false NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: schedules id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules ALTER COLUMN id SET DEFAULT nextval('public.schedules_id_seq'::regclass);


--
-- Name: specialties id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties ALTER COLUMN id SET DEFAULT nextval('public.specialties_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.schedules VALUES (4, 3, 2, 'tuesday', '15:00:00', 'waiting');
INSERT INTO public.schedules VALUES (2, 3, 2, 'monday', '14:00:00', 'confirmed');
INSERT INTO public.schedules VALUES (3, 3, 2, 'monday', '15:00:00', 'canceled');
INSERT INTO public.schedules VALUES (5, 3, 2, 'tuesday', '16:00:00', 'waiting');
INSERT INTO public.schedules VALUES (1, 3, 1, 'monday', '14:00:00', 'finished');


--
-- Data for Name: specialties; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.specialties VALUES (1, 'dermatoligista', 3);
INSERT INTO public.specialties VALUES (2, 'dermatoligista', 4);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'kendy', 'kendy@gmail.com', '$2b$10$uAEUz5dOR1yQFMsyyZzX9Ow38clnDETCplwaq21Qwh.xm.bFDjlMm', 'vitoria', false);
INSERT INTO public.users VALUES (2, 'thi', 'thi@gmail.com', '$2b$10$ThjrSIc.SkI7kL93CJWOUe2H71KgBfOhkzREnwSCDuL6LP07TnwAi', 'vitoria', false);
INSERT INTO public.users VALUES (3, 'roberta', 'roberta@gmail.com', '$2b$10$OUPz7ceSOLKWHOWOi6t4ReXOroIKoUt8pf9X0iW.UPIc3J2onq1pO', 'sao paulo', true);
INSERT INTO public.users VALUES (4, 'luiz', 'luiz@gmail.com', '$2b$10$kzTUYTwwLwFP0Zxl21QK8.TMnpUmzs7hQer3JArJHXneAPunSVZCm', 'sao paulo', true);
INSERT INTO public.users VALUES (5, 'luiza', 'luiza@gmail.com', '$2b$10$KFU9wEv7xthv/gKSy1e37.1zHRyGFjblkMnRx2dYxWuy6l9I95/b.', 'sao paulo', false);


--
-- Name: schedules_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.schedules_id_seq', 5, true);


--
-- Name: specialties_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.specialties_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (id);


--
-- Name: specialties specialties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: schedules schedules_doctor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_doctor_id_fkey FOREIGN KEY (doctor_id) REFERENCES public.users(id);


--
-- Name: schedules schedules_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schedules
    ADD CONSTRAINT schedules_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.users(id);


--
-- Name: specialties specialties_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

