/**
 * @swagger
 * components:
 *  schemas:
 *    Article:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        body:
 *          type: string
 *        description:
 *          type: string
 */

export interface Article {
  title: string
  body: string
  description: string
}
