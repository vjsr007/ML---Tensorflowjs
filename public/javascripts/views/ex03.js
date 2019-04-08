$(() =>{

    const xShape = [6,12];
    const xData =   [
                        [0, 0, 0,   0, 1, 0,    1, 0, 0,    1, 1, 0], //NEG
                        [0, 0, 0,   0, 1, 0,    1, 0, 0,    1, 1, 1], //AND
                        [0, 0, 0,   0, 1, 1,    1, 0, 1,    1, 1, 1], //OR
                        [0, 0, 0,   0, 1, 1,    1, 0, 1,    1, 1, 0], //XOR
                        [0, 0, 1,   0, 1, 1,    1, 0, 1,    1, 1, 0], //NAND
                        [0, 0, 1,   0, 1, 0,    1, 0, 0,    1, 1, 0], //NOR
                        
                    ];
    const yShape = [6,3];
    const yData =   [
                        [0,0,0], //NEG                        
                        [0,0,1], //AND
                        [0,1,0], //OR
                        [0,1,1], //XOR
                        [1,0,0],  //NAND
                        [1,0,1],  //NOR
                    ];
    const epochs = 500;

    let xTensor;
    let yTensor;
    let model;

    const main = async () => {
        createModel();
        
        const trainingResult = await trainModel();

        console.log(tf.memory().numTensors);

        $('button').html('Predict').attr('disabled',false).click(async () => {
            const predict = await predictModel();    
            const result = []
            
            predict.forEach((p) => result.push(Math.round(p)));
            
            console.log(tf.memory().numTensors);

            console.log(result);
            console.log(predict);
            console.log(`loss: ${trainingResult.history.loss[epochs -1]}`);
            switch(JSON.stringify(result)) {
                case JSON.stringify([0,0,0]): //NEG
                    document.getElementById("output").innerText = 'NEG';
                    break;
                case JSON.stringify([0,0,1]): //AND
                    document.getElementById("output").innerText = 'AND';
                    break;
                case JSON.stringify([0,1,0]): //OR
                    document.getElementById("output").innerText = 'OR';
                    break;
                case JSON.stringify([0,1,1]): //XOR
                    document.getElementById("output").innerText = 'XOR';
                    break;
                case JSON.stringify([1,0,0]): //NAND
                    document.getElementById("output").innerText = 'NAND';
                    break;
                case JSON.stringify([1,0,1]): //NOR
                    document.getElementById("output").innerText = 'NOR';
                    break;
                default:
                    document.getElementById("output").innerText = 'FAIL';
            }

        });        
    }

    const createModel = () => {
        model = tf.sequential();
    
        model.add(tf.layers.dense({ units: 5, inputShape: 12, activation: 'tanh'  }));
        model.add(tf.layers.dense({ units: 3, activation: 'sigmoid' }));
        
        const learningRate = 0.5;
        const optimizer = tf.train.sgd(learningRate);
        
        model.compile({ optimizer: optimizer, loss: 'binaryCrossentropy', lr: learningRate });
        // Creating dataset
        xTensor = tf.tensor2d(xData, xShape);
        xTensor.print();
        
        yTensor = tf.tensor2d(yData, yShape);
        yTensor.print();

        console.log(tf.memory().numTensors);
    }
    
    const trainModel = async () => {
        // Train the model
        return await model.fit(xTensor, yTensor, {
            batchSize: 1,
            epochs: epochs
        });
    }

    const predictModel = async () => {
        let input = [];
        $('input').each((i,o)=> input.push($(o).val()));
        const xInput = tf.tensor2d([input], [1,12]);
        
        // Test the model and display output 
        const predict = await model.predict(xInput).data();
        
        return predict;
    }

    main();

});
