import { ProviderParams, reclaimprotocol } from '@reclaimprotocol/reclaim-sdk'
import { ClaimCategory } from '../../types/Claim'
import { IClaim } from '../../model/ProofStatus'

const reclaim = new reclaimprotocol.Reclaim()

const getReclaimProofURL = async (provider: ClaimCategory) => {
    console.log(process.env.CALLBACK_DOMAIN)
    const callback_url = `${process.env.CALLBACK_DOMAIN}/reclaim/callback/`

    // 'https://eok75hfhcykzyj4.m.pipedream.net'

    try {
        const request = reclaim.requestProofs({
            title: provider,
            baseCallbackUrl: callback_url,
            requestedProofs: [
                new reclaim.CustomProvider({
                    provider: provider,
                    payload: {},
                } as ProviderParams),
            ],
        })
        // Store the callback Id and Reclaim URL in your database
        const { callbackId } = request
        const reclaimUrl = await request.getReclaimUrl()

        return {
            reclaimUrl,
            callbackId,
        }
    } catch (error) {
        throw new Error(
            `unable to request proofs, ${(error as Error).toString()}`
        )
    }
}

// returns the param data
const handleCallback = async (encProofs: string): Promise<IClaim> => {
    let proofs

    try {
        proofs = reclaimprotocol.utils.getProofsFromRequestBody(encProofs)
    } catch (error) {
        throw new Error('unable to retrieve proofs from body')
    }

    console.log(proofs)

    // Verify the correctness of the proofs (optional but recommended)
    // const isProofsCorrect = await reclaim.verifyCorrectnessOfProofs(proofs)
    const isProofsCorrect = true

    if (isProofsCorrect) {
        // Proofs are correct, handle them as needed
        // ... process the proofs and update your application's data
        const params = JSON.parse(proofs[0].parameters as string)

        return {
            provider: proofs[0]['provider'],
            data: params,
        }
    } else {
        // Proofs are not correct or verification failed
        console.error('Proofs verification failed')
        throw new Error('Proofs verification failed')
    }
}

export { getReclaimProofURL, handleCallback }
