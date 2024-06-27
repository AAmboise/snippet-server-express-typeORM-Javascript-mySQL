// src/entities/user.js
const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id;

    @Column()
    name;

    @Column({ unique: true })
    email;

    @Column()
    password;
}

module.exports = User;
