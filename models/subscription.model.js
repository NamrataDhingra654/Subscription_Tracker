import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subscription Name is required'],
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    price: {
        type: Number,
        required: [true, 'Subscription Price is required'],
        min: [0, 'Subscription Price must be a positive number'],
    },
    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'SEK'],
        default: 'USD',
    },
    frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
        type: String,
        enum: ['sport', 'entertainment', 'education', 'health', 'business', 'technology', 'lifestyle'],
        required: [true, 'Subscription Category is required'],
    },
    paymentMethod: {
        type: String,
        trim: true,
        required: [true, 'Payment Method is required'],
    },
    status: {
        type: String,
        enum: ['active', 'expired', 'cancelled'],
        default: 'active',
    },
    startDate: {
        type: Date,
        required: [true, 'Subscription Start Date is required'],    
        validate: {
            validator: function(value) {
                return value <= Date.now();
            },
            message: 'Start Date cannot be in the future',
        },
        default: Date.now,
    },
    renewalDate: {
        type: Date,
        required: [true, 'Subscription Renewal Date is required'],
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'Renewal Date must be after Start Date',
        },
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required'],
        index: true,
    },

}, { timestamps: true });

// Auto-calculate the renewal date if missing
SubscriptionSchema.pre('save', function(next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekly: 7,
            monthly: 30,
            yearly: 365,
        };

        
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]); 
    }

    //Auto-update the status if hte renewal date has passed
    if (this.renewalDate < Date.now()) {
        this.status = 'expired';
    }   

    next();
})   

const Subscription = mongoose.model('Subscription', SubscriptionSchema);    

export default Subscription;    