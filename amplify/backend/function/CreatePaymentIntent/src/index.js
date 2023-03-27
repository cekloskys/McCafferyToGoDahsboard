const stripe = require('stripe')('sk_test_51MJf9jGbbj7dyMidj6NGPV4xYRAZ5f3MDbsDthGlSrtjvs9SYmPF2Rzo2WLvSGMKvCFgRpi4nEEmuRYszYQsaJwE00ErIJXywe')

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: event.arguments.amount,
        currency: 'usd'
    });

    return {
        clientSecret: paymentIntent.client_secret,
    }
};
