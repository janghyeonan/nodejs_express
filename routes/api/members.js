const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

//get all members 모든 맴버 불러오기 Get
router.get('/', (req, res) => res.json(members));

//get single members 아이디 값으로 맴버 정보 불러오기 get
router.get('/:id', (req, res) => {
    //res.send(req.params.id);

    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id == parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//create member 맴버 생성 create
router.post('/', (req, res) => {
    //res.send(req.body);
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: `Plase include a name and email` });
    }
    members.push(newMember);
    //res.json(members); //json파일 보여주기
    res.redirect('/') //바로 앞 페이지로 리다이렉트
});

//update member 업데이트 맴버
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;

                res.json({ msg: `member updated`, member });
            }
        })
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

//delete members 맴버 삭제
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json({ msg: `member deleted `, members: members.filter(member => member.id !== parseInt(req.params.id)) });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});
module.exports = router;