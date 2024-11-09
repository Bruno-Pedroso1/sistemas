
const net = require('net');
const readline = require('readline')

const client = new net.Socket()
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

client.connect(4000, '127.0.0.1', () => {
    rl.addListener('line', line => {
        client.write(line)
    })
    console.log('conectou');
    client.write('ola')
    
})
