import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../theme/colors';

// ─────────────────────────────────────────────────────────────
// AGORA SETUP REQUIRED (for the native mobile app only):
// 1. Run: npx expo install react-native-agora
//    (it's intentionally left out of package.json so the web/Vercel
//    build doesn't need to resolve a native-only module)
// 2. Create a free account at https://console.agora.io
// 3. Create a project to get your App ID
// 4. Replace AGORA_APP_ID below (never commit real keys to a public repo —
//    use environment variables / a config file that's git-ignored instead)
// 5. For production, generate temporary tokens server-side rather than
//    using an App ID with App Certificate disabled.
// ─────────────────────────────────────────────────────────────
const AGORA_APP_ID = 'YOUR_AGORA_APP_ID_HERE';
const CHANNEL_NAME = 'route66-bikers-live';

export default function LivestreamScreen() {
  const [isLive, setIsLive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const engineRef = useRef(null);

  useEffect(() => {
    return () => {
      // Clean up the Agora engine on unmount if a stream is active
      if (engineRef.current) {
        engineRef.current.leaveChannel();
        engineRef.current.release();
      }
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      return (
        granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
      );
    }
    return true; // iOS permissions are handled via Info.plist prompts
  };

  const goLive = async () => {
    if (Platform.OS === 'web') {
      Alert.alert(
        'Mobile app required',
        'Live broadcasting needs the native camera/mic access only available in the iOS/Android app. This web preview shows the UI only.'
      );
      return;
    }

    const hasPermission = await requestPermissions();
    if (!hasPermission) {
      Alert.alert('Permissions required', 'Camera and microphone access are needed to go live.');
      return;
    }

    if (AGORA_APP_ID === 'YOUR_AGORA_APP_ID_HERE') {
      Alert.alert(
        'Agora App ID missing',
        'Add your Agora App ID in src/screens/LivestreamScreen.js before going live.'
      );
      return;
    }

    // TODO: initialize the real Agora engine here, e.g.:
    //
    // import { createAgoraRtcEngine, ChannelProfileType, ClientRoleType } from 'react-native-agora';
    //
    // const engine = createAgoraRtcEngine();
    // engine.initialize({ appId: AGORA_APP_ID });
    // engine.enableVideo();
    // engine.setChannelProfile(ChannelProfileType.ChannelProfileLiveBroadcasting);
    // engine.setClientRole(ClientRoleType.ClientRoleBroadcaster);
    // engine.joinChannel(TOKEN, CHANNEL_NAME, 0, {});
    // engineRef.current = engine;

    setIsLive(true);
    setViewerCount(1);
  };

  const endLive = () => {
    // TODO: call engineRef.current.leaveChannel() with the real SDK
    setIsLive(false);
    setViewerCount(0);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoArea}>
        {isLive ? (
          <View style={styles.liveBadgeRow}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
            <View style={styles.viewerBadge}>
              <Ionicons name="eye-outline" size={14} color={colors.white} />
              <Text style={styles.viewerText}>{viewerCount}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="videocam-outline" size={64} color={colors.muted} />
            <Text style={styles.placeholderText}>Camera preview appears here</Text>
            <Text style={styles.placeholderSubtext}>
              Hook up the Agora local video view (RtcSurfaceView) once your App ID is set.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        {!isLive ? (
          <TouchableOpacity style={styles.goLiveButton} onPress={goLive}>
            <Ionicons name="radio-outline" size={20} color={colors.white} />
            <Text style={styles.goLiveText}>Go Live</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.endLiveButton} onPress={endLive}>
            <Ionicons name="stop-circle-outline" size={20} color={colors.white} />
            <Text style={styles.goLiveText}>End Stream</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.asphalt,
  },
  videoArea: {
    flex: 1,
    margin: 16,
    borderRadius: 16,
    backgroundColor: colors.asphaltLight,
    overflow: 'hidden',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  placeholderText: {
    color: colors.chrome,
    marginTop: 14,
    fontSize: 15,
    fontWeight: '600',
  },
  placeholderSubtext: {
    color: colors.muted,
    marginTop: 6,
    fontSize: 12,
    textAlign: 'center',
  },
  liveBadgeRow: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.sunsetRed,
    marginRight: 6,
  },
  liveText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 13,
    marginRight: 10,
    backgroundColor: colors.sunsetRed,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  viewerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  viewerText: {
    color: colors.white,
    fontSize: 12,
    marginLeft: 4,
  },
  controls: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  goLiveButton: {
    flexDirection: 'row',
    backgroundColor: colors.sunsetOrange,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  endLiveButton: {
    flexDirection: 'row',
    backgroundColor: colors.sunsetRed,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goLiveText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 8,
  },
});
