import subprocess
download_dict = {
    "RDS-2020-0016-2__BP_CONUS.zip":"https://usfs-public.box.com/shared/static/7itw7p56vje2m0u3kqh91lt6kqq1i9l1.zip",
    "RDS-2020-0016-2__CFL_CONUS.zip": "https://usfs-public.box.com/shared/static/7nb6hpw2rfc0zrhk1mv80fhbirajoqfd.zip",
    "RDS-2020-0016-2__CRPS_CONUS.zip": "https://usfs-public.box.com/shared/static/v1wjt4r3pp0bjb05w8qfnlbm4y3m66q5.zip",
    "RDS-2020-0016-2__Exposure_CONUS.zip":"https://usfs-public.box.com/shared/static/nbmlha1iejzzjo9y3uoehln493o2c4ad.zip",
    "RDS-2020-0016-2__FLEP4_CONUS.zip":"https://usfs-public.box.com/shared/static/502cm6vef6axhtljvy6b8p35tqugg2ds.zip",
    "RDS-2020-0016-2__FLEP8_CONUS.zip":"https://usfs-public.box.com/shared/static/gwasv734wwcx77zc4wj4ntfhaxyt8mel.zip",
    "RDS-2020-0016-2__RPS_CONUS.zip":"https://usfs-public.box.com/shared/static/88tv8byot0t22o9p1eqlrfqco3z5ouvf.zip",
    "RDS-2020-0016-2__WHP_CONUS.zip":"https://usfs-public.box.com/shared/static/jz74xh0eqdezblhexwu2s2at7fqgom8n.zip"}

        
for key, value in download_dict.items():
    print(f'starting {key}')
    cmd_dl = f"wget -O {key} {value}"
    # cmd_upload = f"s5cmd cp {key} s3://carbonplan-data/USFS/USFS-wildfire-risk-to-communities/"
    cmd_upload = f"s5cmd --numworkers 8 cp --sp {key} s3://carbonplan-data/USFS/USFS-wildfire-risk-to-communities/"

    download = subprocess.run(cmd_dl, capture_output=True, text=True, shell=True)
    print(f"Return Code: {download.returncode}")
    print(f"Standard Output:\n{download.stdout}")
    print(f"Standard Error:\n{download.stderr}")

    # print(f'download complete for {key}')
    upload = subprocess.run(cmd_upload, capture_output=True, text=True, shell=True)
    # print(f'upload complete for {key}')
    subprocess.run(f"rm {key}", capture_output=True, text=True, shell=True)