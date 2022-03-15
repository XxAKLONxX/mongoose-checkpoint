//require express
const express = require("express");

//require express router
const router = express.Router();

//require schema
const Contact = require("../model/Contact");

//CRUDS

/** description: get
 * path: http://localhost:5000/api/contacts/test
 */

 router.get("/test", (req, res) => {
    res.send("test");
  });

/** description: post
 * path: http://localhost:5000/api/contacts/
 * req.body
 */

 router.post("/", async (req, res) => {
    try {
      const { name, email, phone } = req.body;
      const newContact = new Contact({
        name,
        email,
        phone,
      });
      await newContact.save();
      res.status(200).send({ msg: "contact added", newContact });
    } catch (error) {
      res.status(400).send({ msg: "try againe ", error });
    }
  });


  /** description: get all
 * path: http://localhost:5000/api/contacts/all
 * req.body
 */

  router.get('/all',async(req,res)=>{
      try {
          const contactList=await Contact.find()
          res.status(200).send({msg:"Done",contactList})
      } catch (error) {
        res.status(400).send({ msg: "try againe", error });
      }
  })

   /** description: get one
 * path: http://localhost:5000/api/contacts/:_id
 * req.body && req.params
 */ 
router.get('/:_id',async(req,res)=>{
try {
    const {_id}=req.params
    const foundContact=await Contact.findOne({_id})
    res.status(200).send({msg:"Done",foundContact})
    
} catch (error) {
    res.status(400).send({ msg: "try againe", error });
}
})

/** description: update
 * path: http://localhost:5000/api/contacts/edit/:_id
 * req.body && req.params
 */ 
 router.put('/edit/:_id',async(req,res)=>{
    try {
        const {_id}=req.params
        const {name,email,phone}=req.body
        const editContact=await Contact.updateOne({_id},{$set:{...req.body}})
        res.status(200).send({msg:"Done",editContact})
        
    } catch (error) {
        res.status(400).send({ msg: "try againe", error });
    }
    })

    /** description: delete
 * path: http://localhost:5000/api/contacts/delete/:_id
 *  req.params
 */ 
     router.delete('/delete/:_id',async(req,res)=>{
        try {
            const {_id}=req.params
            const deleteContact=await Contact.deleteOne({_id})
            res.status(200).send({msg:"Done",deleteContact})
            
        } catch (error) {
            res.status(400).send({ msg: "try againe", error });
        }
        })

module.exports = router;
