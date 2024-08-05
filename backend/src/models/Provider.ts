import mongoose, { Document, Schema } from 'mongoose';

export interface IProvider extends Document {
  clientRate: string;
  kwhCost: string;
  minimumLimit: string;
  name: string;
  state: string;
  totalClients: string;
  logoUrl: string;
}

const ProviderSchema: Schema = new Schema({
  clientRate: { type: String, required: true },
  kwhCost: { type: String, required: true },
  minimumLimit: { type: String, required: true },
  name: { type: String, required: true },
  state: { type: String, required: true },
  totalClients: { type: String, required: true },
  logoUrl: { type: String, required: true },
});

export default mongoose.model<IProvider>('Provider', ProviderSchema);
