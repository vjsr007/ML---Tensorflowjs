$(() =>{

    const xShape = [4, 2];
    const xData = [[0, 0], [0, 1], [1, 0], [1, 1]];
    const yShape = [4, 1];
    const yData = [[0], [0], [0], [1]]; 
    const epochs = 500;

    let xTensor;
    let yTensor;
    let model;

    const main = async () => {
        createModel();
        const trainingResult = await trainModel();
        const predict = await predictModel();
    
        document.getElementById("output").innerText = predict.map((p) => Math.round(p));
        console.log(predict.map((p) => Math.round(p)));
        console.log(predict);
        console.log(`loss: ${trainingResult.history.loss[epochs -1]}`);
    }

    const createModel = () => {
        model = tf.sequential();
    
        model.add(tf.layers.dense({ units: 4, inputShape: 2, activation: 'tanh' }));
        model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
        
        const learningRate = 0.1;
        const optimizer = tf.train.sgd(learningRate);
        
        model.compile({ optimizer: optimizer, loss: 'binaryCrossentropy', lr: learningRate });
        // Creating dataset
        xTensor = tf.tensor2d(xData, xShape);
        xTensor.print();
        
        yTensor = tf.tensor2d(yData, yShape);
        yTensor.print();
    }
    
    const trainModel = async () => {
        // Train the model
        return await model.fit(xTensor, yTensor, {
            batchSize: 1,
            epochs: epochs
        });
    }

    const predictModel = async () => {
        const xInput = tf.tensor2d(xData, xShape);
        
        // Test the model and display output 
        const predict = await model.predict(xInput).data();
        
        return predict;
    }

    main();
});
