class StripeClient {
    payStripe(token, infoMessage) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve('recipt_123');
            }, 2000);
        });
    }
    // other Stripe methods
}

export default new StripeClient();
