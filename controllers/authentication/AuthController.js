const express = require('express');
var jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../../models/User.model');