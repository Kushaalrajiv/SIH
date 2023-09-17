const {create} = require('ipfs-http-client');
const fs = require("fs");
async function ipfsClient(){
  const ipfs = await create({ host: 'localhost', port: 5001, protocol: 'http' });
  return ipfs;
}

async function saveText() {
  let ipfs = await ipfsClient();

  let result = await ipfs.add(`welcome ${new Date()}`);
  console.log(result);
}
saveText();

async function saveFile() {

  let ipfs = await ipfsClient();

  let data = fs.readFileSync("./guy1.txt")
  let options = {
      warpWithDirectory: false,
      progress: (prog) => console.log(`Saved :${prog}`)
  }
  let result = await ipfs.add(data, options);
  console.log(result)
}
//saveFile()

async function getData(hash) {
  let ipfs = await ipfsClient();

  let asyncitr = ipfs.cat(hash)

  for await (const itr of asyncitr) {

      let data = Buffer.from(itr).toString()
      console.log(data)
  }
}
//getData("QmcZAm9xYi7ibDUwpVzdGKXFgv5iMmMUu7AnsHiEv4MBey")

// async function storeVoterDetails(voterDetails) {
//   try {
//     // Convert voter details to a string
//     const voterDetailsString = JSON.stringify(voterDetails);

//     // Add the string to IPFS, which returns a CID
//     const { cid } = await ipfs.add(voterDetailsString);

//     return cid.toString();
//   } catch (error) {
//     console.error('Error storing voter details on IPFS:', error);
//     throw error;
//   }
// }

// // Example usage
// const voterDetails = {
//   name: 'John Doe',
//   voterID: '123456789',
//   // Add other details here
// };

// storeVoterDetails(voterDetails)
//   .then(cid => {
//     console.log('Voter details stored on IPFS with CID:', cid);
//   })
//   .catch(error => {
//     console.error(error);
//   });

