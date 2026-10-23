import React, { useState } from 'react';
import { 
  Users, 
  UserCheck, 
  Bed, 
  Activity, 
  ShieldCheck 
} from 'lucide-react';

export const HospitalDashboardMockup = () => {
  const [activeTab, setActiveTab] = useState('patients');

  const patients = [
    { id: 'PT-1042', name: 'Robert Chen', age: 45, dept: 'Cardiology', doctor: 'Dr. Sarah Smith', status: 'Admitted', room: 'Bed 302' },
    { id: 'PT-1043', name: 'Elena Rostova', age: 29, dept: 'Neurology', doctor: 'Dr. James Wilson', status: 'OPD Queue', room: 'Room 105' },
    { id: 'PT-1044', name: 'David Kumar', age: 52, dept: 'Orthopedics', doctor: 'Dr. Sarah Smith', status: 'Admitted', room: 'Bed 214' },
    { id: 'PT-1045', name: 'Amina Al-Mansoor', age: 34, dept: 'Pediatrics', doctor: 'Dr. M. Patel', status: 'Discharged', room: 'Discharged' },
  ];

  const doctors = [
    { name: 'Dr. Sarah Smith', dept: 'Cardiology', patients: 12, status: 'On Duty', room: 'Room 301' },
    { name: 'Dr. James Wilson', dept: 'Neurology', patients: 8, status: 'On Duty', room: 'Room 105' },
    { name: 'Dr. Meera Patel', dept: 'Pediatrics', patients: 15, status: 'In Surgery', room: 'OT 2' },
  ];

  return (
    <div className="mockup-window glass-card rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden font-sans text-xs">
      
      {/* Top Application Bar */}
      <div className="bg-slate-900/95 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
          <span className="font-semibold text-slate-200 text-xs">
            CityCare Hospital Management System
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hidden sm:inline-block">
            Python & Relational DB Backend
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Role:</span> Admin
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-slate-950/70 border-b border-slate-800/80">
        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px]">Total Patients</span>
            <Users className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <p className="text-base font-bold text-white mt-1">142</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px]">Doctors On Duty</span>
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <p className="text-base font-bold text-white mt-1">18</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px]">Active Admissions</span>
            <Bed className="w-3.5 h-3.5 text-violet-400" />
          </div>
          <p className="text-base font-bold text-white mt-1">38</p>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[10px]">OPD Queue</span>
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-base font-bold text-white mt-1">24</p>
        </div>
      </div>

      {/* Subnav & Search */}
      <div className="px-4 py-2.5 bg-slate-900/40 flex items-center justify-between border-b border-slate-800/80">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('patients')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'patients'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Patient Directory
          </button>
          <button
            onClick={() => setActiveTab('doctors')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'doctors'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Doctor Roster
          </button>
        </div>

        <div className="text-[11px] text-slate-400 font-mono hidden sm:flex items-center gap-1">
          <span>Database:</span>
          <span className="text-cyan-400">hospital_db.sqlite</span>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-3 overflow-x-auto mockup-table-container">
        {activeTab === 'patients' ? (
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 font-mono text-[10px]">
                <th className="pb-2 pl-2">Patient ID</th>
                <th className="pb-2">Name & Age</th>
                <th className="pb-2">Department</th>
                <th className="pb-2">Attending Doctor</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 pr-2">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {patients.map((p) => (
                <tr key={p.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2.5 pl-2 font-mono text-cyan-400 font-medium">{p.id}</td>
                  <td className="py-2.5 text-slate-200 font-medium">
                    {p.name} <span className="text-slate-400 text-[10px]">({p.age}y)</span>
                  </td>
                  <td className="py-2.5 text-slate-300">{p.dept}</td>
                  <td className="py-2.5 text-slate-400">{p.doctor}</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        p.status === 'Admitted'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : p.status === 'OPD Queue'
                          ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2 text-slate-400 font-mono text-[10px]">{p.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="text-slate-400 border-b border-slate-800 font-mono text-[10px]">
                <th className="pb-2 pl-2">Doctor Name</th>
                <th className="pb-2">Specialization</th>
                <th className="pb-2">Active Patients</th>
                <th className="pb-2">Status</th>
                <th className="pb-2 pr-2">Room / OT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {doctors.map((d, i) => (
                <tr key={i} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-2.5 pl-2 text-slate-200 font-medium">{d.name}</td>
                  <td className="py-2.5 text-slate-300">{d.dept}</td>
                  <td className="py-2.5 text-cyan-400 font-mono">{d.patients} assigned</td>
                  <td className="py-2.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                        d.status === 'On Duty'
                          ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-2.5 pr-2 text-slate-400 font-mono text-[10px]">{d.room}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer Info */}
      <div className="mockup-footer px-4 py-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>SQLite Schema: 8 normalized tables with foreign key cascades</span>
        <span className="text-emerald-400">● CRUD Operations Active</span>
      </div>
    </div>
  );
};
