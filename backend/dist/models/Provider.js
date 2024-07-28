import mongoose, { Schema } from 'mongoose';
const ProviderSchema = new Schema({
    clientRate: { type: String, required: true },
    kwhCost: { type: String, required: true },
    minimumLimit: { type: String, required: true },
    name: { type: String, required: true },
    state: { type: String, required: true },
    totalClients: { type: String, required: true },
});
export default mongoose.model('Provider', ProviderSchema);
