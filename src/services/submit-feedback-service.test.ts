import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy }
);

describe('Submit feedback', () => {
	it('should be able to submit a feedback', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'example comment',
			screenshot: 'data:image/png;base64,98438hofsdgldskg'
		})).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	})

	it('should not be able to submit a feedback without a type', async () => {
		await expect(submitFeedback.execute({
			type: '',
			comment: 'example comment',
			screenshot: 'data:image/png;base64,98438hofsdgldskg'
		})).rejects.toThrow();
	})

	it('should not be able to submit a feedback without a comment', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: '',
			screenshot: 'data:image/png;base64,98438hofsdgldskg'
		})).rejects.toThrow();
	})

	it('should not be able to submit a feedback witH an invalid screenshot', async () => {
		await expect(submitFeedback.execute({
			type: 'BUG',
			comment: 'example comment',
			screenshot: 'testejgs.phsiod'
		})).rejects.toThrow();
	})
})