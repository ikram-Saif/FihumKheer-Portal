import { LuUser, LuPhone, LuMail, LuGlobe, LuMapPin, LuCalendar, LuBriefcase, LuBuilding, LuWrench, LuUsers } from 'react-icons/lu';
import { FaWhatsapp } from 'react-icons/fa';

export const getVolunteerFields = (projects = []) => [
  { name: 'name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter name', fullWidth: false },
  { name: 'phone', label: 'Phone Number', type: 'tel', required: true, placeholder: '+201xxxxxxxx' },
  { name: 'whatsapp', label: 'WhatsApp Number', type: 'tel', placeholder: '+201xxxxxxxx' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'example@mail.com' },
  { name: 'country', label: 'Country', type: 'text', required: true, placeholder: 'e.g. Egypt' },
  { name: 'city', label: 'City', type: 'text', required: true, placeholder: 'e.g. Cairo' },
  { name: 'age', label: 'Age', type: 'number', required: true, placeholder: '25' },
  {
    name: 'gender', label: 'Gender', type: 'select', required: true, options: [
      { value: 'Male', label: 'Male' },
      { value: 'Female', label: 'Female' }
    ]
  },
  { name: 'current_job', label: 'Current Job', type: 'text', placeholder: 'e.g. Software Engineer' },
  { name: 'office', label: 'Office', type: 'text', placeholder: 'e.g. Cairo HQ' },
  { name: 'skills', label: 'Skills', type: 'text', placeholder: 'e.g. React, UX Design, Marketing' },
  {
    name: 'volunteer_type', label: 'Volunteer Type', type: 'select', required: true, options: [
      { value: 'Permanent Volunteer', label: 'Permanent Volunteer' },
      { value: 'Per-Project', label: 'Per-Project' }
    ]
  },
  {
    name: 'working_type', label: 'Type of Work', type: 'select', required: true, options: [
      { value: 'online', label: 'Online' },
      { value: 'onsite', label: 'Onsite' },
      { value: 'both', label: 'Both' }
    ]
  },
  {
    name: 'available_days', label: 'Available Days', type: 'checkbox-group', required: true, options: [
      { value: 'Sat', label: 'Sat' },
      { value: 'Sun', label: 'Sun' },
      { value: 'Mon', label: 'Mon' },
      { value: 'Tue', label: 'Tue' },
      { value: 'Wed', label: 'Wed' },
      { value: 'Thu', label: 'Thu' },
      { value: 'Fri', label: 'Fri' }
    ]
  },
  {
    name: 'projects',
    label: 'Assign Projects',
    type: 'multi-select',
    options: projects.map(p => ({
      value: p.id,
      label: p.name || p.attributes?.name
    }))
  },
  { name: 'media', label: 'Profile Photo', type: 'media', fullWidth: true }
];

export const getProjectFields = (domains = [], volunteers = []) => [
  { name: 'name', label: 'Project Name', type: 'text', required: true, placeholder: 'Project title...' },
  { name: 'type', label: 'Project Type', type: 'text', required: true, placeholder: 'e.g. Health, Education...' },
  { name: 'domain', label: 'Project Domain', type: 'select', options: domains.map(d => ({ value: d.id, label: d.domain_name || d.name })), required: true },
  {
    name: 'status', label: 'Project Status', type: 'select', options: [
      { value: 'pending', label: 'Pending' },
      { value: 'InProgress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' }
    ], required: true
  },
  { name: 'goals', label: 'Target Goal ($)', type: 'number' },
  { name: 'raised', label: 'Raised Amount ($)', type: 'number' },
  { name: 'progress', label: 'Completion (%)', type: 'number' },
  {
    name: 'volunteers',
    label: 'Assign Team Members',
    type: 'multi-select',
    options: volunteers.map(v => ({
      value: v.id,
      label: v.name,
      image: v.image?.[0]?.url ? `http://localhost:1337${v.image[0].url}` : null
    }))
  },
  {
    name: 'urgent_need',
    label: 'Urgent Requirements',
    type: 'checkbox-group',
    options: [
      { value: 'partners', label: 'Partners' },
      { value: 'donors', label: 'Donors' },
      { value: 'volunteers', label: 'Volunteers' }
    ]
  },
  { name: 'media', label: 'Project Visuals', type: 'media', fullWidth: true },
  { name: 'description', label: 'Detailed Description', type: 'rich-text', fullWidth: true }
];

export const getResourceFields = (resource, context = {}) => {
  const { projects = [], domains = [], volunteers = [] } = context;
  
  const registry = {
    projects: () => getProjectFields(domains, volunteers),
    volunteers: () => getVolunteerFields(projects),
    events: () => [
      { name: 'name', label: 'Event Name', type: 'text', required: true, placeholder: 'Event title...' },
      { name: 'date', label: 'Event Date', type: 'date', required: true },
      { name: 'description', label: 'Brief Description', type: 'rich-text' }
    ],
    domains: () => [
      { name: 'name', label: 'Domain Name', type: 'text', required: true, placeholder: 'e.g. Healthcare' },
      { name: 'description', label: 'Description', type: 'text' }
    ],
    users: () => [
      { name: 'name', label: 'User Name', type: 'text', required: true },
      { name: 'email', label: 'Email Address', type: 'email', required: true },
      { name: 'role', label: 'Role', type: 'select', options: [
        { value: 'admin', label: 'Admin' },
        { value: 'author', label: 'Author' }
      ]}
    ]
  };

  return (registry[resource] || (() => [{ name: 'name', label: 'Name', type: 'text', required: true }]))();
};
