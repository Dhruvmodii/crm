-- =======================================================================
-- Softone ERP - Complete Database Schema & Seed Data
-- Suitable for direct import into XAMPP phpMyAdmin / MySQL
-- Maps perfectly to all 14 frontend pages and modules
-- =======================================================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `softone_erp`
--
CREATE DATABASE IF NOT EXISTS `softone_erp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `softone_erp`;

-- --------------------------------------------------------

--
-- 1. Table structure for table `branches` (Branches/Settings Page)
--

CREATE TABLE IF NOT EXISTS `branches` (
  `id` varchar(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text NOT NULL,
  `location_link` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`id`, `name`, `phone`, `address`, `location_link`) VALUES
('BR-01', 'Delhi Gate Clinic', '+91 98101 23456', '12, Netaji Subhash Marg, Daryaganj, near Delhi Gate Metro Station, New Delhi, 110002', 'https://maps.google.com/?q=Delhi+Gate+Metro+Station'),
('BR-02', 'Noida Clinic', '+91 98188 11223', 'C-56, Sector 62, Landmark: Near Fortis Hospital, Noida, Uttar Pradesh, 201301', 'https://maps.google.com/?q=Sector+62+Noida'),
('BR-03', 'Laxmi Nagar Clinic', '+91 99100 44556', 'A-24, Main Vikas Marg, near Laxmi Nagar Metro Station Gate No. 1, East Delhi, 110092', 'https://maps.google.com/?q=Laxmi+Nagar+East+Delhi'),
('BR-04', 'Ghaziabad Clinic', '+91 88002 23344', 'SF-14, Second Floor, Opulent Mall, Gandhi Nagar, Grand Trunk Road, Ghaziabad, Uttar Pradesh, 201001', 'https://maps.google.com/?q=Opulent+Mall+Ghaziabad')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- --------------------------------------------------------

--
-- 2. Table structure for table `users` (Admin Users Page)
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `plain_password` varchar(100) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` enum('super_admin','branch_manager','front_office_executive','audiologist','telecaller','finance_team') NOT NULL,
  `clinic_name` varchar(100) DEFAULT NULL,
  `work_number` varchar(20) DEFAULT NULL,
  `personal_number` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`username`, `password_hash`, `plain_password`, `full_name`, `role`, `clinic_name`, `work_number`, `personal_number`) VALUES
('admin', 'scrypt:32768:16:1$Yf7VqWfU8O5W79b6$7553f191b948f65427494f4b11f26a195c87425895786a3d9050d26f632009890289f66c0e86b03138b813f61947b1c3fa367c00188b03079b768132049d107a', 'admin123', 'Super Admin', 'super_admin', NULL, '+91 99999 11111', '+91 99999 22222'),
('manager', 'scrypt:32768:16:1$Z8gR9WfU8O5W79b6$3e24b3b33036573c23171804f8664188b90558778641a2d98050d26f632009890289f66c0e86b03138b813f61947b1c3fa367c00188b03079b768132049d107a', 'manager123', 'Delhi Gate Manager', 'branch_manager', 'Delhi Gate Clinic', '+91 98101 23456', '+91 98101 99999'),
('receptionist', 'scrypt:32768:16:1$X9hT2WfU8O5W79b6$5b34b3b33036573c23171804f8664188b90558778641a2d98050d26f632009890289f66c0e86b03138b813f61947b1c3fa367c00188b03079b768132049d107a', 'reception123', 'Front Desk Executive', 'front_office_executive', 'Delhi Gate Clinic', '+91 98101 23456', '+91 98101 88888'),
('audiologist', 'scrypt:32768:16:1$W1kP5WfU8O5W79b6$2c14b3b33036573c23171804f8664188b90558778641a2d98050d26f632009890289f66c0e86b03138b813f61947b1c3fa367c00188b03079b768132049d107a', 'audio123', 'Dr. Sharma (Audiologist)', 'audiologist', 'Delhi Gate Clinic', '+91 98101 23456', '+91 98101 77777'),
('telecaller', 'scrypt:32768:16:1$K4jM8WfU8O5W79b6$1a94b3b33036573c23171804f8664188b90558778641a2d98050d26f632009890289f66c0e86b03138b813f61947b1c3fa367c00188b03079b768132049d107a', 'tele123', 'Priya (Telecaller)', 'telecaller', NULL, '+91 99999 33333', '+91 99999 44444'),
('finance', 'scrypt:32768:16:1$L3nP9WfU8O5W79b6$4d84b3b33036573c23171804f8664188b90558778641a2d98050d26f632009890289f66c0e86b03138b813f61947b1c3fa367c00188b03079b768132049d107a', 'finance123', 'Finance Officer', 'finance_team', NULL, '+91 99999 55555', '+91 99999 66666')
ON DUPLICATE KEY UPDATE `username`=VALUES(`username`);

-- --------------------------------------------------------

--
-- 3. Table structure for table `patients` (Patients Directory Page)
--

CREATE TABLE IF NOT EXISTS `patients` (
  `id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `status` enum('active','follow_up','trial','completed') NOT NULL DEFAULT 'active',
  `stage` varchar(50) NOT NULL DEFAULT 'Lead',
  `last_visit` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`id`, `name`, `city`, `phone`, `status`, `stage`, `last_visit`) VALUES
('PT-0001', 'Aarav Bansal', 'Delhi', '9810000001', 'active', 'Trial', '2026-05-01'),
('PT-0002', 'Nisha Kapoor', 'Noida', '9810000002', 'follow_up', 'Counselling', '2026-05-02'),
('PT-0003', 'Piyush Jain', 'Ghaziabad', '9810000003', 'trial', 'Billing', '2026-05-03'),
('PT-0004', 'Harsh Rao', 'Delhi Gate', '9810000004', 'completed', 'Completed', '2026-05-04')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- --------------------------------------------------------

--
-- 4. Table structure for table `telecaller_entries` (CRM Leads / Follow-up Calendar Page)
--

CREATE TABLE IF NOT EXISTS `telecaller_entries` (
  `id` varchar(50) NOT NULL,
  `created_by` varchar(50) NOT NULL,
  `city` varchar(100) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `whatsapp_number` varchar(20) DEFAULT NULL,
  `lead_type` enum('new_enquiry','trial_follow_up','old_patient','reactivation','pending_decision') NOT NULL,
  `response_type` enum('positive','negative') NOT NULL,
  `call_connected` tinyint(1) DEFAULT 1,
  `call_notes` text DEFAULT NULL,
  `call_outcome` enum('appointment_fixed','follow_up_scheduled','not_interested','invalid_number') NOT NULL,
  `follow_up_required` tinyint(1) DEFAULT 0,
  `follow_up_reason` varchar(255) DEFAULT NULL,
  `follow_up_date` date DEFAULT NULL,
  `follow_up_time` time DEFAULT NULL,
  `appointment_booked` tinyint(1) DEFAULT 0,
  `clinic_name` varchar(100) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `appointment_slot` varchar(20) DEFAULT NULL,
  `qr_token` varchar(50) DEFAULT NULL,
  `qr_payload` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 5. Table structure for table `appointments` (Appointments Booking Page)
--

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` varchar(20) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `mobile_number` varchar(20) NOT NULL,
  `clinic_name` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `slot` varchar(20) NOT NULL,
  `source` enum('telecaller','appointments_page','walk_in_block') NOT NULL,
  `status` enum('booked','arrived','completed','no_show','packed') NOT NULL DEFAULT 'booked',
  `booked_by` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 6. Table structure for table `queue_entries` (Live Queue Board / Reception Queue Page)
--

CREATE TABLE IF NOT EXISTS `queue_entries` (
  `id` varchar(20) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `clinic_name` varchar(100) NOT NULL,
  `status` enum('waiting','in_consultation','testing','billing') NOT NULL DEFAULT 'waiting',
  `waiting_since_iso` timestamp NOT NULL DEFAULT current_timestamp(),
  `mobile_number` varchar(20) DEFAULT NULL,
  `arrival_type` enum('walk_in','appointment','call_converted') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 7. Table structure for table `reception_day_summaries` (Reception Check-In EOD Page)
--

CREATE TABLE IF NOT EXISTS `reception_day_summaries` (
  `date` date NOT NULL,
  `expected_cash` decimal(10,2) DEFAULT 0.00,
  `physical_cash` decimal(10,2) DEFAULT 0.00,
  `online_collected` decimal(10,2) DEFAULT 0.00,
  `footfall` int(11) DEFAULT 0,
  `trials` int(11) DEFAULT 0,
  `sales` int(11) DEFAULT 0,
  `pending_follow_ups` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 8. Table structure for table `audiology_assessments` (Audiology Assessment PTA/OAE/BERA Page)
--

CREATE TABLE IF NOT EXISTS `audiology_assessments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` varchar(20) NOT NULL,
  `is_first_visit` tinyint(1) DEFAULT 1,
  `complaint` text DEFAULT NULL,
  `pta_right` varchar(20) DEFAULT NULL,
  `pta_left` varchar(20) DEFAULT NULL,
  `oae` varchar(100) DEFAULT NULL,
  `bera` varchar(100) DEFAULT NULL,
  `results_valid` tinyint(1) DEFAULT 1,
  `hearing_aid_required` tinyint(1) DEFAULT 1,
  `patient_comfortable` tinyint(1) DEFAULT 1,
  `ready_to_purchase` tinyint(1) DEFAULT 0,
  `final_outcome` enum('positive','negative') DEFAULT 'positive',
  `ent_referral` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 9. Table structure for table `audiology_trials` (Audiology Trials & Fitting Handover Page)
--

CREATE TABLE IF NOT EXISTS `audiology_trials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` varchar(20) NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `device_model` varchar(100) NOT NULL,
  `warranty_details` varchar(255) DEFAULT NULL,
  `trial_date` date DEFAULT NULL,
  `outcome` enum('in_progress','ready_for_billing','follow_up_needed') DEFAULT 'in_progress',
  `head_member_session` tinyint(1) DEFAULT 0,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 10. Table structure for table `billing_invoices` (Billing Invoices Page)
--

CREATE TABLE IF NOT EXISTS `billing_invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `patient_id` varchar(20) DEFAULT NULL,
  `device_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `discount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `cash` decimal(10,2) NOT NULL DEFAULT 0.00,
  `upi` decimal(10,2) NOT NULL DEFAULT 0.00,
  `card` decimal(10,2) NOT NULL DEFAULT 0.00,
  `gst_enabled` tinyint(1) DEFAULT 1,
  `taxable_value` decimal(10,2) NOT NULL DEFAULT 0.00,
  `gst_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `grand_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `paid_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `balance_amount` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- 11. Table structure for table `repair_tickets` (Repairs Page)
--

CREATE TABLE IF NOT EXISTS `repair_tickets` (
  `id` varchar(20) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `serial_number` varchar(50) NOT NULL,
  `status` enum('reported_at_branch','sent_to_main_office','warranty_check','estimate_waiting_approval','dispatched_to_company','repair_in_progress','received_at_main_office','quality_check','handover_to_patient','closed') NOT NULL DEFAULT 'reported_at_branch',
  `location` varchar(100) NOT NULL,
  `warranty_type` enum('UW','NW') NOT NULL DEFAULT 'UW',
  `physical_damage` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `repair_tickets`
--

INSERT INTO `repair_tickets` (`id`, `patient_name`, `serial_number`, `status`, `location`, `warranty_type`, `physical_damage`) VALUES
('R-201', 'Nisha Kapoor', 'SN-7781', 'reported_at_branch', 'Noida Branch', 'UW', 0),
('R-202', 'Piyush Jain', 'SN-6632', 'estimate_waiting_approval', 'Delhi Gate', 'NW', 1),
('R-203', 'Harsh Rao', 'SN-4429', 'repair_in_progress', 'Vendor Lab', 'UW', 0)
ON DUPLICATE KEY UPDATE `patient_name`=VALUES(`patient_name`);

-- --------------------------------------------------------

--
-- 12. Table structure for table `inventory_stock` (Inventory Page)
--

CREATE TABLE IF NOT EXISTS `inventory_stock` (
  `serial_number` varchar(50) NOT NULL,
  `model` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `status` enum('available','trial','sold','repair') NOT NULL DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`serial_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inventory_stock`
--

INSERT INTO `inventory_stock` (`serial_number`, `model`, `branch`, `status`) VALUES
('SN-1001', 'SFT Pro 2', 'Delhi Gate', 'available'),
('SN-1002', 'SFT Lite', 'Noida', 'trial'),
('SN-1003', 'SFT Prime', 'Laxmi Nagar', 'repair')
ON DUPLICATE KEY UPDATE `model`=VALUES(`model`);

-- --------------------------------------------------------

--
-- 13. Table structure for table `speech_therapy_cases` (Speech Therapy Page)
--

CREATE TABLE IF NOT EXISTS `speech_therapy_cases` (
  `id` varchar(20) NOT NULL,
  `patient_name` varchar(100) NOT NULL,
  `issue_type` enum('language_disorder','speech_delay','articulation_issue','stammering') NOT NULL,
  `stage` enum('intake','assessment','planning','scheduled','in_session','home_practice','review','closed') NOT NULL DEFAULT 'intake',
  `hearing_coordination` tinyint(1) DEFAULT 0,
  `missed_session` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `speech_therapy_cases`
--

INSERT INTO `speech_therapy_cases` (`id`, `patient_name`, `issue_type`, `stage`, `hearing_coordination`, `missed_session`) VALUES
('SP-001', 'Aarav Bansal', 'speech_delay', 'scheduled', 1, 0)
ON DUPLICATE KEY UPDATE `patient_name`=VALUES(`patient_name`);

-- --------------------------------------------------------

--
-- 14. Table structure for table `hr_employees` (HR Operations Page)
--

CREATE TABLE IF NOT EXISTS `hr_employees` (
  `employee_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` varchar(100) NOT NULL,
  `stage` enum('manpower_planning','recruitment','interview','offer','onboarding','training','attendance_leave','performance','engagement','grievance','payroll','compliance','exit','mis_reporting') NOT NULL,
  `branch` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hr_employees`
--

INSERT INTO `hr_employees` (`employee_id`, `name`, `role`, `stage`, `branch`) VALUES
('EMP-021', 'Simran Kaur', 'Front Office Executive', 'onboarding', 'Noida'),
('EMP-014', 'Rohit Mehta', 'Audiologist', 'performance', 'Delhi Gate')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
