-- UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('hotspot','center','ngo')) NOT NULL,
  region TEXT, city TEXT, address TEXT,
  lat DOUBLE PRECISION, lng DOUBLE PRECISION,
  phone TEXT, contact_email TEXT,
  hours_json JSONB, services_json JSONB,
  capacity_per_day INT DEFAULT 0,
  accessibility_tags TEXT[],
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE, phone TEXT,
  role TEXT CHECK (role IN ('anonymous','applicant','intake','lawyer','coordinator','admin','auditor')) NOT NULL,
  language_pref TEXT DEFAULT 'en',
  organization_id UUID REFERENCES organizations(id),
  is_active BOOLEAN DEFAULT TRUE,
  password_hash TEXT,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE lawyers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  bar_number TEXT,
  practice_areas TEXT[],
  languages TEXT[],
  availability_json JSONB,
  org_id UUID REFERENCES organizations(id),
  profile TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  first_name TEXT, last_name TEXT,
  phone TEXT, email TEXT,
  preferred_language TEXT,
  region TEXT, city TEXT, address TEXT,
  lat DOUBLE PRECISION, lng DOUBLE PRECISION,
  consent_boolean BOOLEAN NOT NULL,
  consent_timestamp TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE intake_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  applicant_id UUID REFERENCES applicants(id),
  topic TEXT, subtopic TEXT, description TEXT,
  preferred_language TEXT,
  preferred_contact_method TEXT CHECK (preferred_contact_method IN ('phone','email')),
  status TEXT CHECK (status IN ('new','screening','eligible','ineligible','referred','closed')) NOT NULL DEFAULT 'new',
  source TEXT CHECK (source IN ('web','hotspot','import')) NOT NULL DEFAULT 'web',
  org_id_candidate UUID REFERENCES organizations(id),
  priority TEXT CHECK (priority IN ('low','normal','high')) DEFAULT 'normal',
  attachments JSONB,
  eligibility_reason TEXT,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  intake_request_id UUID REFERENCES intake_requests(id),
  org_id UUID REFERENCES organizations(id),
  assigned_lawyer_id UUID REFERENCES lawyers(id),
  status TEXT CHECK (status IN ('triaged','assigned','in_progress','resolved','closed')) NOT NULL,
  opened_at TIMESTAMP NOT NULL DEFAULT NOW(),
  closed_at TIMESTAMP, outcome_code TEXT, outcome_notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id),
  day_of_week INT CHECK (day_of_week BETWEEN 0 AND 6),
  open_time TIME, close_time TIME,
  exceptions_json JSONB,
  effective_from DATE, effective_to DATE,
  created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE visits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  org_id UUID REFERENCES organizations(id),
  occurred_at TIMESTAMP NOT NULL DEFAULT NOW(),
  channel TEXT CHECK (channel IN ('web','in_person','phone')),
  page TEXT, utm_json JSONB
);

CREATE TABLE referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  intake_request_id UUID REFERENCES intake_requests(id),
  from_org_id UUID REFERENCES organizations(id),
  to_org_id UUID REFERENCES organizations(id),
  to_lawyer_id UUID REFERENCES lawyers(id),
  reason TEXT,
  status TEXT CHECK (status IN ('pending','accepted','declined','expired')) NOT NULL DEFAULT 'pending',
  decided_at TIMESTAMP
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_id UUID REFERENCES cases(id),
  sender_role TEXT,
  message_type TEXT CHECK (message_type IN ('note','email','sms','call')),
  content TEXT, language TEXT,
  attachments JSONB,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_user_id UUID REFERENCES users(id),
  entity_table TEXT, entity_id UUID,
  action TEXT,
  diff_json JSONB,
  timestamp TIMESTAMP DEFAULT NOW(),
  ip TEXT
);
