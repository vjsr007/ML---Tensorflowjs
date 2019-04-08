const model = tf.sequential();

model.add(tf.layers.dense({ units: 4, inputShape: [2], activation: 'tanh' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

model.compile({ optimizer: 'sgd', loss: 'binaryCrossentropy', lr: 0.1 });
// Creating dataset
const xShape = [4, 2];
const xData = [[0, 0], [0, 1], [1, 0], [1, 1]];
const xTensor = tf.tensor2d(xData, xShape);
//xTensor.print();

const yShape = [4, 1];
const yData = [[0], [1], [1], [1]];
const yTensor = tf.tensor2d(yData, yShape);
//yTensor.print();

// Train the model
model.fit(xTensor, yTensor, {
	batchSize: 1,
	epochs: 500
}).then((result) => { 
    const xInput = tf.tensor2d(xData, xShape);

    // Test the model and display output 
    const predict = model.predict(xInput).dataSync();
    
    document.getElementById("output").innerText = predict;
    console.log(predict);
    console.log(result.history.loss[999])
});

