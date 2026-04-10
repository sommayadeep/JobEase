import React, { useState, useEffect, useCallback } from 'react'
const API = "http://localhost:5001";
import axios from 'axios'
import { FaMapMarkerAlt, FaUsers, FaCalendarAlt, FaRegSmileBeam } from 'react-icons/fa'

// No hardcode API - use proxy

// Add Google Fonts (Inter)
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

const JobCard = ({ job, onEdit, onDelete }) => (
  <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_32px_rgba(255,200,80,0.18)] group">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-extrabold text-white tracking-tight flex-1">{job.workType}</h3>
      <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow">
        <FaUsers className="inline-block text-yellow-700" />
        {job.workerCount}
      </span>
    </div>
    <div className="space-y-2 mb-6">
      <div className="flex items-center gap-2 text-gray-200"><FaMapMarkerAlt className="text-yellow-300" /><span className="font-medium">{job.location}</span></div>
      <div className="flex items-center gap-2 text-gray-200"><FaCalendarAlt className="text-blue-300" /><span>{new Date(job.date).toLocaleDateString()}</span></div>
      <div className="text-xs text-gray-400"><strong>Created:</strong> {new Date(job.createdAt).toLocaleString()}</div>
    </div>
    <div className="flex gap-3">
      <button
        onClick={() => onEdit(job)}
        className="flex-1 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg border border-blue-300/40"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(job._id)}
        className="flex-1 bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg border border-red-300/40"
      >
        Delete
      </button>
    </div>
  </div>
)

const JobForm = ({ jobToEdit, onAdd, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    workerCount: '',
    workType: '',
    location: '',
    date: ''
  })

  useEffect(() => {
    if (jobToEdit) {
      setFormData({
        workerCount: jobToEdit.workerCount,
        workType: jobToEdit.workType,
        location: jobToEdit.location,
        date: jobToEdit.date
      })
    } else {
      setFormData({ workerCount: '', workType: '', location: '', date: '' })
    }
  }, [jobToEdit])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (jobToEdit) {
      onUpdate(formData)
    } else {
      onAdd(formData)
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-10 max-w-md mx-auto">
      <h2 className="text-3xl font-extrabold text-yellow-400 mb-8 text-center drop-shadow bg-clip-text">
        {jobToEdit ? 'Edit Job' : 'Add New Job'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-yellow-300 font-semibold mb-2">Worker Count</label>
          <input
            type="number"
            name="workerCount"
            value={formData.workerCount}
            onChange={handleChange}
            min="1"
            className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="e.g. 5"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-300 font-semibold mb-2">Work Type</label>
          <input
            type="text"
            name="workType"
            value={formData.workType}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="e.g. Construction"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-300 font-semibold mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            placeholder="e.g. Downtown"
            required
          />
        </div>
        <div>
          <label className="block text-yellow-300 font-semibold mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border border-white/20 bg-white/5 text-white placeholder-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
            required
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg border border-green-300/40"
          >
            {jobToEdit ? 'Update Job' : 'Add Job'}
          </button>
          {jobToEdit && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-gray-900 text-yellow-200 font-medium py-3 px-6 rounded-xl transition-all duration-300 shadow border border-yellow-300/20"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

function App() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [jobToEdit, setJobToEdit] = useState(null)
  const [message, setMessage] = useState('')

  // Fetch jobs
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API}/api/jobs`)
      console.log('GET /api/jobs response:', response.data)
      setJobs(response.data.jobs)
      setError(null)
    } catch (err) {
      setError('Failed to fetch jobs')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  const handleAddJob = async (formData) => {
    try {
      const response = await axios.post(`${API}/api/jobs`, formData)
      console.log('POST /api/jobs response:', response.data)
      fetchJobs() // Refresh
      setMessage('Job added successfully!')
      setJobToEdit(null)
    } catch (err) {
      setError('Failed to add job')
    }
  }

  const handleUpdateJob = async (formData) => {
    try {
      const response = await axios.put(`${API}/api/jobs/${jobToEdit._id}`, formData)
      console.log('PUT /api/jobs response:', response.data)
      setMessage('Job updated successfully!')
      setJobToEdit(null)
      fetchJobs()
    } catch (err) {
      setError('Failed to update job')
    }
  }

  const handleDeleteJob = async (id) => {
    if (!confirm('Are you sure you want to delete this job?')) return
    try {
      const response = await axios.delete(`${API}/api/jobs/${id}`)
      console.log('DELETE /api/jobs response:', response.data)
      fetchJobs()
      setMessage('Job deleted successfully!')
    } catch (err) {
      setError('Failed to delete job')
    }
  }

  const showEditForm = (job) => {
    setJobToEdit(job)
    setMessage('')
  }

  const cancelEdit = () => {
    setJobToEdit(null)
    setMessage('')
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #232526 0%, #414345 40%, #283e51 100%)',
      fontFamily: 'Inter, sans-serif',
      minHeight: '100vh'
    }}>
      {/* Decorative blurred gradients and 3D shapes */}
      <div className="pointer-events-none select-none absolute inset-0 w-full h-full z-0">
        <div className="absolute top-[-120px] left-[-120px] w-[340px] h-[340px] rounded-full bg-gradient-to-br from-yellow-400/60 via-yellow-200/40 to-yellow-100/0 blur-3xl opacity-70 animate-pulse-slow" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-blue-500/40 via-blue-300/30 to-blue-100/0 blur-3xl opacity-60 animate-pulse-slow" />
        <div className="absolute top-[40%] left-[-80px] w-[180px] h-[180px] rounded-full bg-gradient-to-br from-yellow-300/40 to-yellow-100/0 blur-2xl opacity-40 animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[-60px] w-[120px] h-[120px] rounded-full bg-gradient-to-tr from-blue-400/30 to-blue-100/0 blur-2xl opacity-30 animate-pulse-slow" />
      </div>
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent mb-4 drop-shadow-[0_8px_32px_rgba(255,215,0,0.25)]">
            JobEase
          </h1>
          <p className="text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed font-medium">
            Effortlessly manage and organize jobs with a premium, modern interface.<br/>Add, edit, and delete jobs with ease.
          </p>
        </div>

        {/* Message */}
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-6 py-4 rounded-xl mb-8 max-w-2xl mx-auto shadow-md">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl mb-8 max-w-2xl mx-auto shadow-md">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Job Form Card */}
          <JobForm
            jobToEdit={jobToEdit}
            onAdd={handleAddJob}
            onUpdate={handleUpdateJob}
            onCancel={cancelEdit}
          />

          {/* Jobs List */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6 flex items-center drop-shadow">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                Job Listings ({jobs.length})
              </h2>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                </div>
              ) : jobs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <FaRegSmileBeam className="text-yellow-400 text-6xl drop-shadow" />
                  </div>
                  <h3 className="text-2xl font-bold text-yellow-200 mb-2">No jobs yet</h3>
                  <p className="text-yellow-300">Add your first job using the form on the left.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onEdit={showEditForm}
                      onDelete={handleDeleteJob}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App