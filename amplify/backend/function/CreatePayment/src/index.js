const stripe = require('stripe')('sk_test_51MJf9jGbbj7dyMidj6NGPV4xYRAZ5f3MDbsDthGlSrtjvs9SYmPF2Rzo2WLvSGMKvCFgRpi4nEEmuRYszYQsaJwE00ErIJXywe')


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const {typeName, arguments} = event;

    if (typeName == 'Mutation') {
        throw new Error('Request is not a mutation')
    }
    if (!arguments?.amount) {
        throw new Error('Amount argument is required')
    }

    // create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: arguments.amount,
        currency: 'usd'
    })

    return {
        clientSecret: paymentIntent.client_secret,
    }
    
};
