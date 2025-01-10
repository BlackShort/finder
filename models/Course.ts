import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  contentOutline: {
    type: [String],
  },
  resources: {
    type: [String],
    required: true
  },
  timeline: {
    type: String,
    required: true
  },
  careerOpportunities: {
    type: [String],
  },
  tags: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File'
  },
}, {
  timestamps: true
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);

