"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirestoreService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
const R = require("ramda");
const firebase_admin_service_1 = require("../admin/firebase-admin.service");
var FieldValue = firebase_admin_1.firestore.FieldValue;
let FirestoreService = class FirestoreService {
    constructor(firebaseAdminService) {
        this.firebaseAdminService = firebaseAdminService;
    }
    get firestore() {
        return this.firebaseAdminService.firebase.firestore;
    }
    increment(value) {
        return this.firestore.FieldValue.increment(R.is(Number, value) ? value : 1);
    }
    decrement(value) {
        return this.firestore.FieldValue.increment(R.is(Number, value) ? -value : -1);
    }
    async getDataByDocumentId(collection, documentId) {
        const result = await this.firestore()
            .collection(collection)
            .doc(documentId)
            .get();
        return result.data();
    }
    async getCollectionIds(collection) {
        const result = await this.firestore().collection(collection).select().get();
        return result.docs.map((doc) => doc.id);
    }
    async isCollectionEmpty(collection) {
        const { empty } = await this.firestore()
            .collection(collection)
            .select()
            .get();
        return empty;
    }
    add(collection, value) {
        return this.firestore().collection(collection).add(value);
    }
    set(collection, doc, value) {
        return this.firestore().collection(collection).doc(doc).set(value);
    }
    delete(collection, doc) {
        return this.firestore().collection(collection).doc(doc).delete();
    }
    mergeUpdate(collection, document, value) {
        return this.firestore()
            .collection(collection)
            .doc(document)
            .set(value, { merge: true });
    }
    addToArrayAt(collection, document, path, value) {
        return this.firestore()
            .collection(collection)
            .doc(document)
            .update({
            [path]: FieldValue.arrayUnion(value),
        });
    }
    update(collection, document, value) {
        return this.firestore().collection(collection).doc(document).update(value);
    }
    initWriteBatch() {
        return this.firestore().batch();
    }
    transactionalSet(collection, document, value, transactionOptions) {
        const docRef = this.firestore().collection(collection).doc(document);
        return transactionOptions.writeBatch.set(docRef, value);
    }
    transactionalDelete(collection, document, transactionOptions) {
        const docRef = this.firestore().collection(collection).doc(document);
        return transactionOptions.writeBatch.delete(docRef);
    }
    transactionalMergeUpdate(collection, document, value, transactionOptions) {
        const docRef = this.firestore().collection(collection).doc(document);
        return transactionOptions.writeBatch.set(docRef, value, { merge: true });
    }
    transactionalMergeUpdateWithIncrement(collection, document, key, value, transactionOptions) {
        const docRef = this.firestore().collection(collection).doc(document);
        return transactionOptions.writeBatch.set(docRef, { [key]: FieldValue.increment(value.incrementValue) }, { merge: true });
    }
};
FirestoreService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_admin_service_1.FirebaseAdminService])
], FirestoreService);
exports.FirestoreService = FirestoreService;
//# sourceMappingURL=firestore.service.js.map