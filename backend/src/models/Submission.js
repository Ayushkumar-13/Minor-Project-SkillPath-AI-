import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roadmap',
    required: true
  },
  repoUrl: { type: String, required: true },
  repoName: { type: String },
  repoOwner: { type: String },
  isValid: { type: Boolean, default: false },
  isEmpty: { type: Boolean, default: true },
  languages: [{ type: String }],
  status: { type: String, enum: ['empty', 'verified', 'invalid'], default: 'empty' },
  checkedAt: { type: Date, default: Date.now }
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
