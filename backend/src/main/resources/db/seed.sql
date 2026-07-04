USE hospital_agent_db;

-- Clear Existing Data (Optional/Safe order due to Foreign Keys)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE doctors;
TRUNCATE TABLE departments;
TRUNCATE TABLE faqs;
TRUNCATE TABLE contact_info;
TRUNCATE TABLE chat_logs;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Seed Departments
INSERT INTO departments (id, name, description, floor_location, timings, services) VALUES
(1, 'Cardiology', 'Comprehensive diagnostic and therapeutic services for cardiovascular conditions.', '2nd Floor, Wing A', '09:00 AM - 05:00 PM', 'ECG, Echocardiography, Coronary Angiography, Pacemaker Implantation'),
(2, 'Pediatrics', 'Dedicated care for infants, children, and adolescents.', '1st Floor, Wing B', '08:00 AM - 04:00 PM', 'Immunization, General Pediatrics, Pediatric Cardiology, Neonatal ICU'),
(3, 'Orthopedics', 'Treatment for musculoskeletal system injuries, diseases, and disorders.', 'Ground Floor, Wing B', '09:00 AM - 05:00 PM', 'Joint Replacement, Fracture Management, Sports Medicine, Physiotherapy'),
(4, 'Radiology', 'Advanced imaging services for precise diagnostic support.', 'Ground Floor, Wing A', '24 Hours (OPD: 09:00 AM - 06:00 PM)', 'X-Ray, Ultrasound, CT Scan, MRI, Mammography'),
(5, 'General Medicine', 'Primary care, diagnosis, and non-surgical treatment of internal diseases.', '1st Floor, Wing A', '08:00 AM - 08:00 PM', 'Routine Checkups, Chronic Disease Management, Health Screening'),
(6, 'Emergency', '24/7 critical care services for acute trauma and medical emergencies.', 'Ground Floor, Main Entrance', '24 Hours', 'Trauma Care, Resuscitation, Cardiac Life Support, Ambulance Services');

-- 2. Seed Doctors
INSERT INTO doctors (id, name, specialization, department_id, availability_days, op_timings, room_cabin, is_available) VALUES
(1, 'Dr. Sarah Jenkins', 'Interventional Cardiologist', 1, 'Monday, Wednesday, Friday', '09:00 AM - 01:00 PM', 'Room 201', 1),
(2, 'Dr. Marcus Vance', 'Pediatrician', 2, 'Tuesday, Thursday, Saturday', '09:00 AM - 02:00 PM', 'Room 105', 1),
(3, 'Dr. Elena Rostova', 'Orthopedic Surgeon', 3, 'Monday, Tuesday, Thursday', '10:00 AM - 03:00 PM', 'Room 112', 1),
(4, 'Dr. Alan Turing', 'Radiologist', 4, 'Monday to Friday', '09:00 AM - 05:00 PM', 'Scan Cabin 1', 1),
(5, 'Dr. Robert Chen', 'Internal Medicine Specialist', 5, 'Monday, Wednesday, Thursday, Friday', '04:00 PM - 08:00 PM', 'Room 102', 1),
(6, 'Dr. Lisa Kudrow', 'Emergency Physician', 6, 'Monday to Sunday (Roster)', 'Flexible (Shift System)', 'ER Desk 1', 1),
(7, 'Dr. Emily Watson', 'Cardiology Surgeon', 1, 'Tuesday, Thursday', '11:00 AM - 04:00 PM', 'Room 203', 1);

-- 3. Seed FAQs
INSERT INTO faqs (id, category, question, answer) VALUES
(1, 'Visiting', 'What are the visiting hours for general wards?', 'Visiting hours for general wards are from 4:00 PM to 7:00 PM daily. Only one visitor is allowed per patient at a time.'),
(2, 'Visiting', 'Are children allowed as visitors?', 'Children under the age of 12 are generally not allowed in inpatient wards for health and safety reasons, except under special circumstances.'),
(3, 'OPD', 'How do I book an OPD consultation?', 'In Phase 1, you can check doctor schedules online. To book, please visit the reception desk in Wing A or call +1-800-555-0199.'),
(4, 'Billing', 'Where is the discharge billing counter located?', 'The discharge billing counter is located on the Ground Floor, next to the main pharmacy in Wing A.'),
(5, 'Emergency', 'What should I do in case of a medical emergency?', 'For immediate emergency assistance, call our 24/7 hotline at +1-800-555-0911 or visit the Emergency Room at the Ground Floor Main Entrance.'),
(6, 'General', 'Is parking available at the hospital?', 'Yes, 24/7 multi-level parking is available behind Wing B. The first 30 minutes are free, followed by standard hourly rates.'),
(7, 'General', 'Do you have an in-house pharmacy?', 'Yes, we have two 24/7 pharmacies: one on the Ground Floor (Wing A) and another near the Emergency Department.');

-- 4. Seed Contact Information
INSERT INTO contact_info (id, phone_type, phone_number, email, address, visiting_hours) VALUES
(1, 'Emergency Hotline', '+1-800-555-0911', 'emergency@cityhospital.com', '100 Medical Plaza Way, Metro City, NY 10001', '24 Hours (Immediate Access)'),
(2, 'General Reception', '+1-800-555-0199', 'info@cityhospital.com', '100 Medical Plaza Way, Metro City, NY 10001', '08:00 AM - 08:00 PM'),
(3, 'Ambulance Service', '+1-800-555-0455', 'ambulance@cityhospital.com', '100 Medical Plaza Way, Metro City, NY 10001', '24 Hours');
