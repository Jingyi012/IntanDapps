import { useState, useEffect } from 'react';
import '../../App.css';
import { db } from 'firebase-config.js'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'