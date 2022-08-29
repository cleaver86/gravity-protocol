import { Alert, AlertDescription, AlertIcon, AlertTitle, Box } from '@chakra-ui/react'

// Title text for the various transaction notifications.
const TRANSACTION_TITLES = {
  transactionStarted: 'Local Transaction Started',
  transactionSucceed: 'Local Transaction Completed',
}

// Takes a long hash string and truncates it.
function truncateHash(hash: string, length = 38): string {
  return hash.replace(hash.substring(4, length), '...')
}

/**
 * Component
 */
function Notifications(notifications): JSX.Element {
  return (
    <>
      {notifications.length && notifications.map((notification) => {
        if (notification.type === 'walletConnected') {
          return null
        }
        return (
          <Alert
            key={notification.id}
            status="success"
            position="fixed"
            bottom="8"
            right="8"
            width="400px"
          >
            <AlertIcon />
            <Box>
              <AlertTitle>
                {TRANSACTION_TITLES[notification.type]}
              </AlertTitle>
              <AlertDescription overflow="hidden">
                Transaction Hash:{' '}
                {truncateHash(notification.transaction.hash, 61)}
              </AlertDescription>
            </Box>
          </Alert>
        )
      })}
    </>
  )
}

export default Notifications
