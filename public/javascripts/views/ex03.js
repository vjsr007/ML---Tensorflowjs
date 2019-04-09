$(() =>{

    
    const operations = [
        { idx: 0 , name: 'Contradiction'},
        { idx: 1 , name: 'Logical NOR'},
        { idx: 2 , name: 'Converse nonimplication'},
        { idx: 3 , name: 'Fpq	Negation'},
        { idx: 4 , name: 'Material nonimplication'},
        { idx: 5 , name: 'Gpq	Negation'},
        { idx: 6 , name: 'Exclusive disjunction XOR'},
        { idx: 7 , name: 'Logical NAND'},
        { idx: 8 , name: 'Logical conjunction AND'},
        { idx: 9 , name: 'Logical biconditional XNOR'},
        { idx: 10 , name: 'Projection function'},
        { idx: 11 , name: 'Material implication'},
        { idx: 12 , name: 'Projection function'},
        { idx: 13 , name: 'Converse implication'},
        { idx: 14 , name: 'Logical disjunction OR'},
        { idx: 15 , name: 'Tautology T'}
    ];

    let xData = [];
    let yData = [];
    const epochs = 100;

    let xTensor;
    let yTensor;
    let model;

    const main = async () => {
        fillDataset();

        console.log(tf.memory().numTensors);        

        createModel();

        console.log(tf.memory().numTensors);

        const trainingResult = await trainModel();

        console.log(tf.memory().numTensors);

        $('button').html('Predict').attr('disabled',false).click(async () => {
            const predict = await predictModel();    
            console.log(tf.memory().numTensors);
            console.log(predict);
            console.log(`loss: ${trainingResult.history.loss[epochs -1]}`);
            $("#output").html(`Name: ${predict.name}`)
        });
    }

    const createModel = () => {
        model = tf.sequential();
    
        model.add(tf.layers.dense({ units: 16, inputShape: [4], activation: 'tanh'  }));
        model.add(tf.layers.dense({ units: 16, activation: 'sigmoid' }));
        
        const learningRate = 0.5;
        const optimizer = tf.train.sgd(learningRate);
        
        model.compile({ optimizer: optimizer, loss: 'binaryCrossentropy', lr: learningRate });
    }
    
    const trainModel = async () => {
        // Train the model
        return await model.fit(xTensor, yTensor, {
            batchSize: 1,
            epochs: epochs
        });
    }

    const predictModel = async () => {
        let output = [];
        let input = [];
        $('input.output').each((i,o)=> output.push($(o).val()));
        input.push(output.reverse());

        const xInput = tf.tensor2d(input);
        xInput.print();
        
        let operation;
        tf.tidy(() => {
            let results = model.predict(xInput);
            console.log(results.dataSync());
            let argMax = results.argMax(1);
            let data  = argMax.dataSync()
            console.log(data);
            let index = data[0];
            operation = operations[index];
        });
        return operation;
    }

    const fillDataset = () => {
        xData = [];
        yData = []
        operations.forEach((o,i) => {
            xData.push(('0000' + o.idx.toString(2)).slice(-4).split(''));
            yData.push(o.idx);
        });

        // Creating dataset
        xTensor = tf.tensor2d(xData);
        xTensor.print();

        let valuesTensor = tf.tensor1d(yData, 'int32');

        yTensor = tf.oneHot(valuesTensor, 16).cast('float32');
        valuesTensor.dispose();        
        yTensor.print();    
    }

    main();

});
